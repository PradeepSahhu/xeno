"use client";
import { useState } from "react";
import { QueryBuilderDnD } from "@react-querybuilder/dnd";
import * as ReactDnD from "react-dnd";
import * as ReactDndHtml5Backend from "react-dnd-html5-backend";
import * as ReactDndTouchBackend from "react-dnd-touch-backend";
import { QueryBuilder } from "react-querybuilder";
import { fields } from "./fields";
import "react-querybuilder/dist/query-builder.css";
import "./styles.css";
import styles from "./queryBuilderStyle";
import { useRouter } from "next/navigation";
import { useUser } from "./userContext";

const initialQuery = { combinator: "and", rules: [] };

const Query = ({ path }) => {
  const user = useUser();
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [campaignInfo, setCampaignInfo] = useState({
    campaignName: "",
    audienceSize: 0,
  });

  const [loading, setLoading] = useState(false);

  const generateRandomAudienceSize = () => {
    const value = Math.floor(Math.random() * 5000) + 100;
    setCampaignInfo((prevValue) => ({ ...prevValue, audienceSize: value }));
  };

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setCampaignInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  const handleButtonSubmission = async () => {
    // Handle form submission

    console.table([query]);

    // setLoading(true);

    const CampaignData = {
      name: campaignInfo.campaignName,
      rule: query,
      audienceSize: campaignInfo.audienceSize,
      sendCount: 12,
      failedCount: 0,
      createdBy: user.name,
    };

    try {
      const res = await fetch(
        "http://localhost:4000/api/campaign/addCampaign",
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(CampaignData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log([campaignInfo]);

      router.push(path);

      // setLoading(false);
    } catch (error) {
      console.log(error);
    }

    // redirect("./campaignHistory");
  };

  return (
    <div className="min-h-screen flex justify-center px-4 sm:px-6 lg:px-8 py-10 bg-white">
      <div className="w-full max-w-4xl text-black">
        <div className="border-t border-t-black rounded-t-xl px-4 sm:px-6 py-4 mb-6 bg-gray-50">
          <label className="block mb-2 text-sm font-medium">
            Enter the Campaign Name
          </label>
          <input
            className="w-full rounded-xl px-4 py-2 outline-none focus:ring-0 focus:border-transparent border border-gray-300"
            placeholder="Enter the Campaign Name"
            onChange={handleInfoChange}
            name="campaignName"
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 overflow-auto">
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
              onQueryChange={handleQueryChange}
              showCombinatorsBetweenRules
              controlClassnames={styles}
            />
          </QueryBuilderDnD>
        </div>

        <div className="my-4">
          <p className="text-lg font-semibold">
            Audience Size:{" "}
            <span className="text-blue-700">{campaignInfo.audienceSize}</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            className="bg-red-600 px-5 py-3 text-white rounded-xl hover:bg-red-700 w-full sm:w-auto"
            onClick={generateRandomAudienceSize}
          >
            Preview
          </button>

          <button
            className="bg-gray-600 px-5 py-3 text-white rounded-xl hover:bg-gray-700 w-full sm:w-auto"
            onClick={handleButtonSubmission}
          >
            {loading ? "......" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Query;
