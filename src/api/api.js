import { supabase } from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";

let today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;

async function postResultMatch(params) {
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
  }
}

async function getListKlasemen() {
  let { data, error } = await supabase
    .from("tbl_klasemen")
    .select(`*, member:member_id(nama, id, member_uuid)`)
    .order("point", { ascending: false })
    .order("diff_score", { ascending: false });
  // dataListKlasemen = data;

  for (let i = 0; i < data.length; i++) {
    data[i] = { ...data[i], rank_klasemen: i + 1 };
  }

  return data;
}

export { postResultMatch, getListKlasemen };
