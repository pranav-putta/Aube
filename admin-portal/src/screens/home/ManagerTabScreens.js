import * as React from "react";
import CollectionManagerScreen from "./CollectionManagerScreen";
import {
  doctors_page,
  reps_page,
  visits_page,
} from "../../components/Constants";

export function DoctorsTabScreen(props) {
  return (
    <CollectionManagerScreen mod={doctors_page} navigation={props.navigation} />
  );
}
export function SalesRepsTabScreen(props) {
  return (
    <CollectionManagerScreen mod={reps_page} navigation={props.navigation} />
  );
}
export function VisitsTabScreen(props) {
  return (
    <CollectionManagerScreen mod={visits_page} navigation={props.navigation} />
  );
}
