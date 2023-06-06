import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import { Fragment } from "react";

import Register from "./pages/Register";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import VolunteerList from "./pages/VolunteerList";
import OrganiserList from "./pages/OrganiserList";
import EventList from "./pages/EventList";
import PreviousEvents from "./pages/PreviousEvents";
import SignIn from "./pages/SignIn";
import AddEvents from "./pages/AddEvents";
import EditEvents from "./pages/EditEvents";
import ViewEvents from "./pages/ViewEvents";
import EditDis from "./pages/EditDis";
import Demo from "./pages/demo";
import EditCha from "./pages/EditCha";
import EditFun from "./pages/EditFun";
import MyEvents from "./pages/MyEvents";
import ParticipatedEvents from "./pages/ParticipatedEvents";
import DonorForm from "./pages/DonorForm";
import EventsDonate from "./pages/EventsDonate";
import Transactions from "./pages/Transactions";

function App(id) {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/previousevents" element={<PreviousEvents />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/volunteerlist" element={<VolunteerList />} />
        <Route path="/organiserlist" element={<OrganiserList />} />
        <Route path="/eventlist" element={<EventList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/addevents" element={<AddEvents />} />
        <Route path="/editevents/:id" element={<EditEvents />} />
        <Route path="/participatedevents" element={<ParticipatedEvents />} />
        <Route path="/donate/:title" element={<DonorForm />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/view" element={<ViewEvents />} />
        <Route path="/disaster/:id" element={<EditDis />} />
        <Route path="/function/:id" element={<EditFun />} />
        <Route path="/charity/:id" element={<EditCha />} />
        <Route path="/donatenow" element={<EventsDonate />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Fragment>
  );
}

export default App;
