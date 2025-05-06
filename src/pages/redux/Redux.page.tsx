import { Header } from "@/shared/widgets/header/header";
import { NavBar } from "@/shared/components/naw-bar/naw-bar";
import { Outlet } from "react-router-dom";
import { reduxRoutNames, routNames } from "@/config/routes";


export function ReduxPage() {

  return (
    <>
      <Header />
      <NavBar 
            links={[
              { 
                to: reduxRoutNames.counters, 
                title: 'Счетчики', 
                description: 'Хз зачем они' 
              },
              { 
                to: reduxRoutNames.users, 
                title: 'Пользователи', 
                description: 'Массив из 3000 объектов, тесты скорости' 
              },
            ]}
          />
      <Outlet />
    </>
  );
}