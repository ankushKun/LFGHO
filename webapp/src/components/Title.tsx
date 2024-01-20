import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";

export default function Title() {
  const code = "npm install karma-vouch";
  const language = "bash";

  return (
    <div className="w-full h-[45rem] box-border bg-slate-600">
  <div className="flex flex-col md:flex-row justify-around pt-10 md:pt-20 pl-4 md:pl-14">
    <div className="w-full md:w-2/5 h-[25rem] md:h-auto mb-8 md:mb-0"> {/*border-solid border-black border-4*/}
      <h1 className="text-5xl md:text-9xl">Karma Vouch</h1>
      <h2 className="text-2xl md:text-3xl pt-4 md:pt-8">
        Elevating Trust in the Blockchain with Karma Vouch - Where DAO Members Validate Genuine Identities
      </h2>
    </div>
    <div className="w-full md:w-2/5 h-[25rem] md:h-auto flex flex-col justify-center items-center gap-7"> {/*border-solid border-black border-4*/}
      <h1 className="text-2xl md:text-3xl mb-1">npm library!</h1>
      <div className="w-full md:w-72">
        {/* Assuming you want the code block to be full width on small screens and 72 on medium and large screens */}
        <CopyBlock text={code} language={language} theme={dracula} />
      </div>
    </div>
  </div>
</div>

 
    

  );
}
