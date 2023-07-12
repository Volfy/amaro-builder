const NotesText = (props: { notes: string }) => {
  return (
    <div className="pl-2 text-left text-base italic text-orange-700 2xl:text-lg">
      {props.notes}
    </div>
  );
};

export default NotesText;
