import "./createButton.css";

const CreateButton = () => {
  console.log("CreateButton rendered");
  return (
    <div className="create-button_wrapper">
      <button className="Btn">
        <div className="sign">+</div>
        <div className="text">Create</div>
      </button>
    </div>
  );
};

export default CreateButton;
