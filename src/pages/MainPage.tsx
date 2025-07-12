import Footer from "../components/footer";
import Nav from "../components/Nav";
import PhotoList from "../components/PhotoList";
import CreateButton from "../uiComponents/CreateButton";

const MainPage = () => {
  return (
    <>
      <CreateButton />
      <Nav />
      <PhotoList />
      <Footer />
    </>
  );
};
export default MainPage;
