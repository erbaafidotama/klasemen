import { supabase } from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";

let today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;

async function postResultMatch(params) {
  console.log("postResultMatch", params);
  const { data: dataResult, errorResult } = await supabase
    .from("tbl_result_match")
    .insert({
      result_match_uuid: uuidv4(),
      team_a_player_1_id: params.team_a_player_1.id,
      team_a_player_2_id: params.team_a_player_2.id,
      team_b_player_1_id: params.team_b_player_1.id,
      team_b_player_2_id: params.team_b_player_2.id,
      team_a_set_1: params.set_1.team_a_set_1,
      team_a_set_2: params.set_2.team_a_set_2,
      team_a_set_3: params.set_3.team_a_set_3,
      team_b_set_1: params.set_1.team_b_set_1,
      team_b_set_2: params.set_2.team_b_set_2,
      team_b_set_3: params.set_3.team_b_set_3,
      tanggal_match: today,
    });

  if (dataResult) {
    return dataResult;
  } else {
    console.log("THIS IS ERROR =>", errorResult);
  }
}

export { postResultMatch };
