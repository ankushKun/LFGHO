import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";

export default function Title() {
  const code = "npm install karma-vouch";
  const language = "bash";

  return (
    <div className="w-full h-[30rem] box-border bg-slate-600">
      <div className="flex flex-row justify-around pt-20 pl-14">
        <div className="w-2/5 h-[25rem] "> {/*border-solid border-black	border-4*/}
          <h1 className="text-9xl">Karma Vouch</h1>
          <h2 className="text-3xl pt-8">
            Elevating Trust in the Blockchain with Karma Vouch - Where DAO
            Members Validate Genuine Identities
          </h2>
        </div>
        <div className="w-2/5 h-[25rem] flex flex-col justify-center items-center gap-7"> {/*border-solid border-black	border-4*/}
          <h1 className="text-3xl">npm library!</h1>
          <div className="w-72">
            <CopyBlock text={code} language={language} theme={dracula} />
          </div>
        </div>
      </div>
    </div>
  );
}
