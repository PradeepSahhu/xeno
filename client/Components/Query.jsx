import { useState } from "react";
import { QueryBuilderDnD } from "@react-querybuilder/dnd";
import * as ReactDnD from "react-dnd";
import * as ReactDndHtml5Backend from "react-dnd-html5-backend";
import * as ReactDndTouchBackend from "react-dnd-touch-backend";
// import type { RuleGroupType } from "react-querybuilder";
import { QueryBuilder } from "react-querybuilder";
import { fields } from "./fields";
import "react-querybuilder/dist/query-builder.css";
import "./styles.css";
import Link from "next/link";

const initialQuery = { combinator: "and", rules: [] };
const Query = () => {
  const [query, setQuery] = useState(initialQuery);

  const handleButtonSubmission = () => {};

  console.log(query);
  return (
    <div className="h-[100vh] flex justify-center ">
      <div className="text-black max-w-1/2  ">
        <div className="">
          <QueryBuilderDnD
            dnd={{
              ...ReactDnD,
              ...ReactDndHtml5Backend,
              ...ReactDndTouchBackend,
            }}
          >
            <QueryBuilder
              fields={fields}
              query={query}
              onQueryChange={setQuery}
              showCombinatorsBetweenRules
            />
          </QueryBuilderDnD>
        </div>

        <div className="text-black ">
          <p className="text-lg">Count : 986 </p>
        </div>
        <div className="flex my-5 justify-between">
          <Link
            href="./campaignHistory"
            className="bg-red-600 px-5 py-3 text-white rounded-xl "
            onClick={handleButtonSubmission}
          >
            Create
          </Link>

          <Link
            href="./campaignHistory"
            className="bg-gray-600 px-5 py-3 text-white rounded-xl "
            onClick={handleButtonSubmission}
          >
            Save
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Query;
