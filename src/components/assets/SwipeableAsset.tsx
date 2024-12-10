import React from 'react'
import { Button, Icon, ListItem, Text } from 'react-native-elements'
import { AssetDetailModel } from '../../types/assets'
import { GestureResponderEvent } from 'react-native'

interface AssetProps {
  data: AssetDetailModel
  onPress?: () => void
  onDelete?: (id: string) => void
}

export default function SwipeableAsset({
  data: { id, assetTypeName, assetId, serialNo, assetStatusName },
  onPress,
  onDelete,
}: AssetProps) {
  const handleOnPress = () => {
    onPress && onPress()
  }

  const handleOnDelete = (id: string) => {
    onDelete && onDelete(id)
  }

  const RightContent = (value: any) => (
    <Button
      containerStyle={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f4f4f4',
      }}
      type="clear"
      icon={{ name: 'delete-outline' }}
      onPress={() => handleOnDelete(value.id)}
    />
  )

  return (
    //   <ListItem.Swipeable key={id} bottomDivider onPress={handleOnPress}
    //   leftContent={LeftContent}
    //   rightContent={(action) => (
    //     <Button
    //       containerStyle={{
    //         flex: 1,
    //         justifyContent: "center",
    //         backgroundColor: "#f4f4f4",
    //       }}
    //       type="clear"
    //       icon={{ name: "delete-outline" }}
    //       onPress={action}
    //     />
    //   )}
    //   >
    //     <ListItem.Content>
    //       <ListItem.Title style={{ fontSize: 12 }}>
    //         {serialNo} {assetStatusName} {assetTypeName}
    //       </ListItem.Title>
    //     </ListItem.Content>
    //     <ListItem.Chevron name='chevron-right' type='feather' />
    //   </ListItem.Swipeable>
    <ListItem.Swipeable
      leftWidth={80}
      rightWidth={90}
      //minSlideWidth={40}
      rightContent={<RightContent id={id} />}
    >
      <ListItem.Content>
        <ListItem.Title style={{ fontSize: 12 }}>
          {serialNo} {assetStatusName} {assetTypeName}
        </ListItem.Title>
        {/* <ListItem.Subtitle>Hey, I'm John Doe</ListItem.Subtitle> */}
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  )
}
