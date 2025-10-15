import { IonPage, IonRouterOutlet } from "@ionic/react";
import isAuthenticated from "global/helpers/isAuthenticates";
import { Redirect, Route, Switch } from "react-router";
import { HistoriaClinicaProvider } from "_+_HistoriaClinica/context/Provider";
import GlobalInitializeDataHC from "_+_HistoriaClinica/GlobalInitializeDataHC";
import PaginaNoEncontrada from "../pages/PaginaNoEncontrada/PaginaNoEncontrada";
import routes from "./listRoutes";
import { AnimatePresence } from "framer-motion";

const RouterHistoriaClinica = ({ match }) => {
  let path = window.location.pathname;

  return (
    <AnimatePresence mode="wait">
      <HistoriaClinicaProvider>
        <GlobalInitializeDataHC>
          <IonPage>
            <IonRouterOutlet>
              <Switch>
                {routes.map((route, key) => {
                  if (
                    route.path.toLocaleLowerCase() === path.toLocaleLowerCase()
                  ) {
                    document.title = route.title;
                  }
                  return (
                    <Route
                      path={route.path}
                      key={key}
                      exact
                      render={(props) =>
                        route.auth &&
                        !isAuthenticated() &&
                        route.path !== "/" ? (
                          <Redirect to="/" />
                        ) : (
                          <route.component {...props} />
                        )
                      }
                    />
                  );
                })}

                <Route path="/" component={PaginaNoEncontrada} />
              </Switch>
            </IonRouterOutlet>
          </IonPage>
        </GlobalInitializeDataHC>
      </HistoriaClinicaProvider>
    </AnimatePresence>
  );
};

export default RouterHistoriaClinica;
