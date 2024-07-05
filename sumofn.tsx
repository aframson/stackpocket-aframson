import { MainStateProvider } from "@/StateContex";
import {
  handleInputValues,
  isEmpty,
  calculatedUserPrize,
  removeWhiteSpaces,
  handleChange,
} from "@/functions/msc";
import { TWO_SIDES_ACTION_TYPES } from "@/games/5d/stateActions";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import styles from "./page.module.css";

function SumOfTwoNo({
  data,
  inputValues,
  setInputValues,
  multiplier,
  twoSidesRadioTab,
}: any) {
  const { twosideSelections, twosideSelectionsDispatch, setTwoSidesTab }: any =
    MainStateProvider();

  const { data: session }: any = useSession();

  // useEffect(() => {
  //   setTwoSidesTab("1st/2nd");
  // }, []);
  return (
    <>
      {" "}
      <Sumof1st2nd
        data={data}
        inputValues={inputValues}
        setInputValues={setInputValues}
        twosideSelections={twosideSelections}
        twosideSelectionsDispatch={twosideSelectionsDispatch}
        multiplier={multiplier}
        session={session}
      />
      <br />
      <br />
      <TailSumof1st2nd
        data={data}
        inputValues={inputValues}
        setInputValues={setInputValues}
        twosideSelections={twosideSelections}
        twosideSelectionsDispatch={twosideSelectionsDispatch}
        multiplier={multiplier}
        session={session}
      />
    </>
  );
}

export default SumOfTwoNo;

function Sumof1st2nd({
  data,
  inputValues,
  setInputValues,
  twosideSelections,
  twosideSelectionsDispatch,
  multiplier,
  session,
}) {
  const game_name = "Sum of 2 No.";

  return (
    <section className={styles.wrapper}>
   <div className={styles.tio}>{game_name}</div>
    <div id={styles.boardnew} className={styles.board}>
      {data?.["Sum of 2 No."].data.map((item: any, i: number) => (
        <button
          className={styles.boarditem}
          key={i}
          style={{
            border:
              (handleInputValues(
                game_name,
                item,
                multiplier,
                "color",
                true,
                game_name, //data.names[1],
                twosideSelections,
                inputValues
              ) as string) !== null
                ? "1px solid #ED712E"
                : "none",
            backgroundColor: handleInputValues(
              game_name,
              item,
              multiplier,
              "color",
              true,
              game_name, //data.names[1],
              twosideSelections,
              inputValues
            ) as string,
          }}
          id={styles.miniboarditem}
          onClick={(e) => {
            // alert("ji")
            // console.log("big combo", item)
            // console.log("nanananana ", {
            //   game_name,
            //   item,
            //   multiplier,
            //   x: "setInputValues",
            //   a: typeof item.label === "number",
            //   //game_name, //data.names[1],
            //   twosideSelections,
            //   inputValues,
            // });
            setInputValues(
              handleInputValues(
                game_name,
                item,
                multiplier,
                "setInputValues",
                true,
                game_name, //data.names[1],
                twosideSelections,
                inputValues
              )
            );
            let amt = handleInputValues(
              game_name,
              item,
              multiplier,
              "emptyString",
              true,
              game_name, //data.names[1],
              twosideSelections,
              inputValues
            );

            twosideSelectionsDispatch({
              type: TWO_SIDES_ACTION_TYPES.REAL_NUMBERS,
              payload: {
                rowId: item.key,
                userSelection: item.label,
                position: game_name,
                game_name: game_name, //data.names[1],
                amount: amt,
                label_id: item.labelid,
                game_id: item.gameid,
              },
            });
          }}
        >
          {/* {item.gameid} */}
          <span
            style={{ fontSize: 11, border: "1px" }}
            className={`${styles.name} ${styles.nametxt}`}
          >
            {item.label}
          </span>
          <span className={styles.oddsxx}>
            {isEmpty(session?.user?.name?.rebate)
              ? 0
              : calculatedUserPrize(item.odds, 1, session?.user?.name?.rebate)}
          </span>
          <input
            style={{ width: 280 }}
            id={`${styles.input} ${
              isNaN(item.label)
                ? removeWhiteSpaces(item.label)
                : `_${removeWhiteSpaces(item.label)}`
            }-${item.key.toString().replace(/\s/g, "")}${game_name} kills`}
            className={styles.input}
            type="text"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              handleChange(
                e,
                item,
                game_name,
                game_name,
                TWO_SIDES_ACTION_TYPES.REAL_NUMBERS,
                twosideSelectionsDispatch,
                setInputValues
              );
            }}
            value={
              Object.values(twosideSelections).length > 0 &&
              twosideSelections?.[game_name]?.[game_name]?.hasOwnProperty(
                item?.key
              ) &&
              twosideSelections?.[game_name]?.[game_name]?.[
                item.key
              ]?.hasOwnProperty(item?.label)
                ? inputValues[
                    `${
                      isNaN(item.label)
                        ? removeWhiteSpaces(item.label)
                        : `_${item.label.toString().replace(/\s/g, "")}`
                    }-${item.key.toString().replace(/\s/g, "")}${game_name}`
                  ]
                : ""
            }
          />
        </button>
      ))}
    </div>
    </section>
  );
}
function TailSumof1st2nd({
  data,
  inputValues,
  setInputValues,
  twosideSelections,
  twosideSelectionsDispatch,
  multiplier,
  session,
}) {
  const game_name = "Tail Sum of 3 No.";

  return (
    <section className={styles.wrapper2}>
    <div className={styles.tio}>{game_name}</div>
     <div id={styles.boardnew} className={styles.board}>
      {data?.["Tail Sum of 3 No."].data.map((item: any, i: number) => (
        <button
          className={styles.boarditem}
          key={i}
          style={{
            border:
              (handleInputValues(
                game_name,
                item,
                multiplier,
                "color",
                true,
                game_name, //data.names[1],
                twosideSelections,
                inputValues
              ) as string) !== null
                ? "1px solid #ED712E"
                : "none",
            backgroundColor: handleInputValues(
              game_name,
              item,
              multiplier,
              "color",
              true,
              game_name, //data.names[1],
              twosideSelections,
              inputValues
            ) as string,
          }}
          id={styles.miniboarditem}
          onClick={(e) => {
            // alert("ji")
            // console.log("big combo", item)
            // console.log("nanananana ", {
            //   game_name,
            //   item,
            //   multiplier,
            //   x: "setInputValues",
            //   a: typeof item.label === "number",
            //   //game_name, //data.names[1],
            //   twosideSelections,
            //   inputValues,
            // });
            setInputValues(
              handleInputValues(
                game_name,
                item,
                multiplier,
                "setInputValues",
                true,
                game_name, //data.names[1],
                twosideSelections,
                inputValues
              )
            );
            let amt = handleInputValues(
              game_name,
              item,
              multiplier,
              "emptyString",
              true,
              game_name, //data.names[1],
              twosideSelections,
              inputValues
            );

            twosideSelectionsDispatch({
              type: TWO_SIDES_ACTION_TYPES.REAL_NUMBERS,
              payload: {
                rowId: item.key,
                userSelection: item.label,
                position: game_name,
                game_name: game_name, //data.names[1],
                amount: amt,
                label_id: item.labelid,
                game_id: item.gameid,
              },
            });
          }}
        >
          <span
            style={{ fontSize: 11, border: "1px" }}
            className={`${styles.name} ${styles.nametxt}`}
          >
            {item.label}
          </span>
          <span className={styles.oddsxx}>
            {isEmpty(session?.user?.name?.rebate)
              ? 0
              : calculatedUserPrize(item.odds, 1, session?.user?.name?.rebate)}
          </span>
          <input
            style={{ width: 280 }}
            id={`${styles.input} ${
              isNaN(item.label)
                ? removeWhiteSpaces(item.label)
                : `_${removeWhiteSpaces(item.label)}`
            }-${item.key.toString().replace(/\s/g, "")}${game_name} kills`}
            className={styles.input}
            type="text"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              handleChange(
                e,
                item,
                game_name,
                game_name,
                TWO_SIDES_ACTION_TYPES.REAL_NUMBERS,
                twosideSelectionsDispatch,
                setInputValues
              );
            }}
            value={
              Object.values(twosideSelections).length > 0 &&
              twosideSelections?.[game_name]?.[game_name]?.hasOwnProperty(
                item?.key
              ) &&
              twosideSelections?.[game_name]?.[game_name]?.[
                item.key
              ]?.hasOwnProperty(item?.label)
                ? inputValues[
                    `${
                      isNaN(item.label)
                        ? removeWhiteSpaces(item.label)
                        : `_${item.label.toString().replace(/\s/g, "")}`
                    }-${item.key.toString().replace(/\s/g, "")}${game_name}`
                  ]
                : ""
            }
          />
        </button>
      ))}
    </div>
    </section>
  );
}
