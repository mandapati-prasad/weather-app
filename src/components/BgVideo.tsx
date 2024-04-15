import React, { ReactElement } from "react";

interface Props {
  src:string
 }

export default function BgVideo({src}: Props): ReactElement {
  return (
    <div>
      <video
        src={`/${src}.mp4`}
        className="h-full w-full absolute top-0 left-0 object-cover -z-10"
        autoPlay
        loop
        muted
      />
    </div>
  );
}
