import { IonApp, IonPage } from "@ionic/react";
import RouterApp from "./global/routes/routes";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "@fontsource/rubik/400.css";
// import "@fontsource/rubik/500.css";
// import "@fontsource/rubik/700.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const App = () => (
  <IonApp>
    <IonPage>
      <RouterApp />
    </IonPage>
  </IonApp>
);

export default App;
