import classNames from 'classnames';

type TypeChatRoom = {
  roomId: string;
  name: string;
};

const ChatRoomDetail = (props: TypeChatRoom) => {
  return (
    <>
      <div
        className={classNames(
          `flex justify-between my-5 p-2`,
          `rounded-xl bg-zinc-400`
        )}
      >
        <div>{props.roomId}</div>
        <div>{props.name}</div>
      </div>
    </>
  );
};

export default ChatRoomDetail;
