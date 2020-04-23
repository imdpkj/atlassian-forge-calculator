import api from "@forge/api";
import { Operation } from "./types";
import { OperatorSymbolMap } from "./symbols";

export const addComment = async (issue: string, operation: Operation) => {
  const commentBody = `{
    "body": {
      "type": "doc",
      "version": 1,
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "text": "${operation.operand} ${
    OperatorSymbolMap[operation.operator]
  } ${operation.operandi} is ${operation.result}",
              "type": "text"
            }
          ]
        }
      ]
    }
  }`;

  console.log(operation, commentBody, issue);

  const response = await api
    .asApp()
    .requestJira(`/rest/api/3/issue/${issue}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: commentBody,
    });

  const responseBody = await response.json();
  //Logging api response
  if (!response.ok) {
    console.error(responseBody);
  } else {
    console.info(responseBody);
  }
};
