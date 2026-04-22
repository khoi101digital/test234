import React, { useCallback, useMemo } from 'react';
import { FlatListProps, ListRenderItem, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import LoadingIndicator from '../ASLoadingIndicator';

type ListItem = Record<string, unknown>;

export type ASListViewProps = FlatListProps<ListItem> & {
  data: ListItem[];
  renderItem: ListRenderItem<ListItem>;
  loading?: boolean | boolean[] | undefined;
  accessibilityLabel?: string;
  testId?: string;
  orientation?: 'horizontal' | 'vertical';
  startSpacing?: number;
  itemSpacing?: number;
  endSpacing?: number;
};

const ASListView: React.FC<ASListViewProps> = (props: ASListViewProps) => {
  const {
    data,
    renderItem,
    loading,
    testId = 'ASListView',
    orientation = 'vertical',
    startSpacing,
    itemSpacing,
    endSpacing,
    ...restProps
  } = props;

  const keyExtractor = useCallback((item: ListItem, index: number) => {
    return `${item?.id || item?.label || ''} - ${index}`;
  }, []);

  const isHorizontal = orientation === 'horizontal';

  const memoizedRenderItem = useCallback(
    (info: Parameters<ListRenderItem<ListItem>>[0]) => renderItem(info),
    [renderItem],
  );

  // Create header component for start spacing
  const ListHeaderComponent = useMemo(
    () =>
      startSpacing ? (
        <View
          style={
            isHorizontal ? { width: startSpacing } : { height: startSpacing }
          }
        />
      ) : null,
    [isHorizontal, startSpacing],
  );

  // Create separator component for item spacing
  const ItemSeparatorComponent = useMemo(
    () =>
      itemSpacing
        ? () => (
            <View
              style={
                isHorizontal ? { width: itemSpacing } : { height: itemSpacing }
              }
            />
          )
        : undefined,
    [isHorizontal, itemSpacing],
  );

  // Create footer component for end spacing
  const ListFooterComponent = useMemo(
    () =>
      endSpacing ? (
        <View
          style={isHorizontal ? { width: endSpacing } : { height: endSpacing }}
        />
      ) : null,
    [isHorizontal, endSpacing],
  );

  return (
    <>
      <LoadingIndicator
        style={styles.loadingIndicator}
        loading={loading}
        testID={`loadingView-${testId}`}
      />
      <FlatList
        testID={`list-${testId}`}
        horizontal={isHorizontal}
        data={data}
        renderItem={memoizedRenderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        {...restProps}
      />
    </>
  );
};

export default ASListView;

const styles = StyleSheet.create({
  loadingIndicator: {
    marginVertical: 8,
  },
});

// Note: ASListView example
/*
// Vertical list with spacing
<ASListView 
  data={[{id: '1', title: 'Item 1'},
         {id: '2', title: 'Item 2'},
         {id: '3', title: 'Item 3'}]}
  numColumns={3}
  startSpacing={20}
  itemSpacing={12}
  endSpacing={50}
  renderItem={({item}: { item: ListItem }) => {
    return (
      <ASColumn style={{alignItems:'center'}}>
        <ASText style={{flex:1, backgroundColor:'red'}}>{item?.title}</ASText>
      </ASColumn>
    )
  }}
/>

// Horizontal list with spacing
<ASListView 
  orientation="horizontal"
  data={[{id: '1', title: 'Item 1'},
         {id: '2', title: 'Item 2'},
         {id: '3', title: 'Item 3'}]}
  startSpacing={16}
  itemSpacing={12}
  endSpacing={32}
  renderItem={({item}: { item: ListItem }) => {
    return (
      <ASColumn style={{alignItems:'center'}}>
        <ASText style={{flex:1, backgroundColor:'red'}}>{item?.title}</ASText>
      </ASColumn>
    )
  }}
/>
*/
