import Nav from "../components/Nav";
import SettingsList from "../components/settingsList";
import CreateButton from "../uiComponents/CreateButton";

const SettingsPage = () => {
  return (
    <>
      <title>Settings</title>
      <CreateButton />
      <Nav />
      <SettingsList />
    </>
  );
};
export default SettingsPage;
