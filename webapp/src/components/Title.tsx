import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";

export default function Title() {
  const code = "npm install karma-vouch";
  const language = "bash";

  return (
    <div className="w-full  box-border bg-gradient-to-b from-slate-800 to-zinc-700 text-white">
      <div className="flex flex-col md:flex-row justify-around py-20 mx-auto">
        <div className="w-full md:w-2/5 text-center"> {/*border-solid border-black border-4*/}
          <h1 className="text-5xl md:text-9xl p-10">Karma Vouch</h1>
          <h2 className="text-2xl md:text-3xl p-10">
            Elevating Trust in the Blockchain with Karma Vouch - Where DAO Members Validate Genuine Identities
          </h2>
        </div>
        <div className="w-full md:w-2/5  flex flex-col justify-center items-center gap-7"> {/*border-solid border-black border-4*/}
          <h1 className="text-2xl md:text-3xl mb-1">npm library!</h1>
          <div className="w-full md:w-72">
            {/* Assuming you want the code block to be full width on small screens and 72 on medium and large screens */}
            <CopyBlock text={code} language={language} theme={dracula} />
          </div>
          <a href="https://github.com/ankushKun/LFGHO" target="_blank" className=" underline underline-offset-4">View Docs</a>
        </div>
      </div>
    </div>




  );
}
