import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test1 from "./test1";

const withLayout = (Component) => {
  return (
    <>
      {Component} 
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/test1',
    element: withLayout(<Test1 />),
    errorElement: "로딩중"
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
