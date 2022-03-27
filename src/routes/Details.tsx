import {useParams} from "react-router-dom";
import React from "react";

export function Details() {
  let params = useParams();
  return <div>{JSON.stringify(params)}</div>
}
