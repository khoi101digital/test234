PLATFORM=$1
ENV=${2:-dev}

# Test Data Configuration - Update these values as needed
TC2411_RECTANGLE_2_VALUE="TestSearch123"
TC2411_RECTANGLE_2_LONG_VALUE="TestSearch123"
TC2411_RECTANGLE_2_SPECIAL_VALUE="TestSearch123"

# Set environment-specific variables
case "$ENV" in
dev)
	ANDROID_APP_ID="com.test234.dev"
	IOS_APP_ID="org.reactjs.native.example.test234"
	APK_PATH="app/build/outputs/apk/development/debug/app-development-debug.apk"
	SCHEME="test234-Development"
	;;
staging)
	ANDROID_APP_ID="com.test234.staging"
	IOS_APP_ID="org.reactjs.native.example.test234Staging"
	APK_PATH="app/build/outputs/apk/staging/debug/app-staging-debug.apk"
	SCHEME="testApp-Staging"
	;;
prod)
	ANDROID_APP_ID="com.test234"
	IOS_APP_ID="org.reactjs.native.example.test234"
	APK_PATH="app/build/outputs/apk/release/app-release.apk"
	SCHEME="test234"
	;;
*)
	echo "Unknown environment: $ENV"
	exit 1
	;;
esac

if [ "$PLATFORM" == "android" ]; then
	cd android
	echo "🛠️  Building APK..."
	case "$ENV" in
	dev)
		./gradlew assembleDevelopmentDebug
		;;
	staging)
		./gradlew assembleStagingDebug
		;;
	prod)
		./gradlew assembleRelease
		;;
	esac
	echo "📱 Installing APK..."
	adb install -r "$APK_PATH"
	cd ..
	echo "⌨️  Disabling virtual keyboard..."
	adb shell settings put secure show_ime_with_hard_keyboard 0
	adb shell ime disable com.android.inputmethod.latin/.LatinIME 2>/dev/null || true
	echo "🚀 Running Master Test Suite on Android..."
	maestro test e2e/master_suite.yaml \
		--env APP_ID="$ANDROID_APP_ID" \
		--env TC2411_RECTANGLE_2_VALUE="$TC2411_RECTANGLE_2_VALUE" \
		--env TC2411_RECTANGLE_2_LONG_VALUE="$TC2411_RECTANGLE_2_LONG_VALUE" \
		--env TC2411_RECTANGLE_2_SPECIAL_VALUE="$TC2411_RECTANGLE_2_SPECIAL_VALUE" |
		tee maestro-detailed-output.log

	# Convert XML to JSON
	echo "📊 Parsing Maestro log to JSON..."
	node parseMaestroLog.js maestro-detailed-output.log

	# Generate comprehensive test reports
	echo "📈 Generating comprehensive test reports..."
	node generateTestReport.js e2e/master_suite.yaml e2e maestro-detailed-output.log test-reports test-metadata.json

elif [ "$PLATFORM" == "ios" ]; then
	APP_NAME="test234"
	WORKSPACE="ios/$APP_NAME.xcworkspace"
	DESTINATION="platform=iOS Simulator,name=iPhone 16 Pro"
	BUILD_DIR="ios/build"

	echo "🛠️  Building iOS app for simulator..."
	xcrun xcodebuild -workspace "$WORKSPACE" \
		-scheme "$SCHEME" \
		-configuration Development \
		-sdk iphonesimulator \
		-destination "$DESTINATION" \
		-derivedDataPath "$BUILD_DIR" \
		-build

	APP_PATH="$BUILD_DIR/Build/Products/Release-iphonesimulator/$APP_NAME.app"

	if [ ! -d "$APP_PATH" ]; then
		echo "Build failed or .app not found at $APP_PATH"
		exit 1
	fi

	echo "📱 Preparing simulator..."
	SIM_STATUS=$(xcrun simctl list | grep -A1 "iPhone 16 Pro" | grep -o "Booted")
	if [ "$SIM_STATUS" != "Booted" ]; then
		echo "🔄 Booting iPhone 16 Pro simulator..."
		xcrun simctl boot "iPhone 16 Pro"
	else
		echo "iPhone 16 Pro simulator already booted."
	fi

	echo "🔁 Restarting Simulator UI..."
	killall Simulator || true
	open -a Simulator

	echo "📲 Installing app to simulator..."
	xcrun simctl install booted "$APP_PATH"

	echo "🚀 Launching app..."
	xcrun simctl launch booted org.reactjs.native.example.test234

	echo "✅ Running Master Test Suite on iOS..."
	maestro test e2e/master_suite.yaml \
		--env APP_ID="$IOS_APP_ID" \
		--env TC2411_RECTANGLE_2_VALUE="$TC2411_RECTANGLE_2_VALUE" \
		--env TC2411_RECTANGLE_2_LONG_VALUE="$TC2411_RECTANGLE_2_LONG_VALUE" \
		--env TC2411_RECTANGLE_2_SPECIAL_VALUE="$TC2411_RECTANGLE_2_SPECIAL_VALUE" |
		tee maestro-detailed-output.log

	# Generate comprehensive test reports
	echo "📈 Generating comprehensive test reports..."
	node generateTestReport.js e2e/master_suite.yaml e2e maestro-detailed-output.log test-reports test-metadata.json

else
	echo "Usage: $0 [android|ios]"
	exit 1
fi
