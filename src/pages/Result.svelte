<script>
import {
  Col,
  Container,
  Row,
  Button,
  Modal,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Alert,
} from "sveltestrap";
import Table from "../components/tables/TableResult.svelte";
import { supabase } from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { onMount } from "svelte";
import { postResultMatch } from "../api/api";

$: dataListResultMatch = [];
onMount(() => {
  getListResultMatch();
});

let visibleAlertSuccess = false;

let formValues = {
  team_a_player_1: [],
  team_a_player_2: [],
  team_b_player_1: [],
  team_b_player_2: [],
  set_1: {
    team_a_set_1: null,
    team_b_set_1: null,
  },
  set_2: {
    team_a_set_2: null,
    team_b_set_2: null,
  },
  set_3: {
    team_a_set_3: null,
    team_b_set_3: null,
  },
};
let today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;

let winA = 0;
let winB = 0;
let resultWinMatch = "";
async function submitDataResultMatch() {
  // SETUP SET WINNNER
  for (const key of Object.keys(formValues)) {
    if (key.includes("set_1")) {
      if (formValues[key].team_a_set_1 > formValues[key].team_b_set_1) {
        winA += 1;
      } else {
        winB += 1;
      }
    } else if (key.includes("set_2")) {
      if (formValues[key].team_a_set_2 > formValues[key].team_b_set_2) {
        winA += 1;
      } else {
        winB += 1;
      }
    } else if (key.includes("set_3")) {
      if (formValues[key].team_a_set_3 > formValues[key].team_b_set_3) {
        winA += 1;
      } else {
        winB += 1;
      }
    }
  }

  console.log(winA, winB)

  // SETUP MATCH WINNER FROM RESULT SET
  if (winA > winB) {
    resultWinMatch = "team_a";
  } else if (winA < winB) {
    resultWinMatch = "team_b";
  } else if (winA === winB) {
    resultWinMatch = "draw";
  }

  const dataPostResultMatch = postResultMatch(formValues);

  for (const key of Object.keys(formValues)) {
    if (key.includes("player")) {
      const dataKlasemenMember = await getOneMember(formValues[key]);

      if (dataKlasemenMember.length >= 1) {
        // UPDATE DATA KLASEMEN
        let totalScoreTeamSet;
        let totalCoScoreTeamSet;
        let point;
        let win;
        let draw;
        let lose;

        if (key.includes("team_a")) {
          totalScoreTeamSet =
            formValues.set_1.team_a_set_1 +
            formValues.set_2.team_a_set_2 +
            formValues.set_3.team_a_set_3;

          totalCoScoreTeamSet =
            formValues.set_1.team_b_set_1 +
            formValues.set_2.team_b_set_2 +
            formValues.set_3.team_b_set_3;

          // totalDiffScore = totalScoreTeamSet - totalCoScoreTeamSet;

          point =
            resultWinMatch === "team_a"
              ? 3
              : resultWinMatch === "team_b"
              ? 0
              : 1;

          win =
            resultWinMatch === "team_a"
              ? 1
              : resultWinMatch === "team_b"
              ? 0
              : 0;
          draw =
            resultWinMatch === "team_a"
              ? 0
              : resultWinMatch === "team_b"
              ? 0
              : 1;
          lose =
            resultWinMatch === "team_a"
              ? 0
              : resultWinMatch === "team_b"
              ? 1
              : 0;
        } else {
          totalScoreTeamSet =
            formValues.set_1.team_b_set_1 +
            formValues.set_2.team_b_set_2 +
            formValues.set_3.team_b_set_3;

          totalCoScoreTeamSet =
            formValues.set_1.team_a_set_1 +
            formValues.set_2.team_a_set_2 +
            formValues.set_3.team_a_set_3;

          // totalDiffScore = totalScoreTeamSet - totalCoScoreTeamSet;

          point =
            resultWinMatch === "team_b"
              ? 3
              : resultWinMatch === "team_a"
              ? 0
              : 1;

          win =
            resultWinMatch === "team_a"
              ? 0
              : resultWinMatch === "team_b"
              ? 1
              : 0;
          draw =
            resultWinMatch === "team_a"
              ? 0
              : resultWinMatch === "team_b"
              ? 0
              : 1;
          lose =
            resultWinMatch === "team_a"
              ? 1
              : resultWinMatch === "team_b"
              ? 0
              : 0;
        }

        const { data, error } = await supabase
          .from("tbl_klasemen")
          .update({
            total_score:
              parseInt(totalScoreTeamSet) +
              parseInt(dataKlasemenMember[0].total_score),
            total_co_score:
              parseInt(totalCoScoreTeamSet) +
              parseInt(dataKlasemenMember[0].total_co_score),
            // diff_score:
            //   totalDiffScore + parseInt(dataKlasemenMember[0].diff_score),
            point: point + dataKlasemenMember[0].point,
            play: parseInt(dataKlasemenMember[0].play) + 1,
            win: parseInt(dataKlasemenMember[0].win) + win,
            draw: parseInt(dataKlasemenMember[0].draw) + draw,
            lose: parseInt(dataKlasemenMember[0].lose) + lose,
          })
          .eq("member_id", dataKlasemenMember[0].member_id);
      } else {
        // NEW DATA KLASEMEN
        let totalScoreTeamSet;
        let totalCoScoreTeamSet;
        let point;
        let win;
        let draw;
        let lose;
        if (key.includes("team_a")) {
          totalScoreTeamSet =
            formValues.set_1.team_a_set_1 +
            formValues.set_2.team_a_set_2 +
            formValues.set_3.team_a_set_3;

          totalCoScoreTeamSet =
            formValues.set_1.team_b_set_1 +
            formValues.set_2.team_b_set_2 +
            formValues.set_3.team_b_set_3;

          // totalDiffScore = totalScoreTeamSet - totalCoScoreTeamSet;

          point =
            resultWinMatch === "team_a"
              ? 3
              : resultWinMatch === "team_b"
              ? 0
              : 1;

          win =
            resultWinMatch === "team_a"
              ? 1
              : resultWinMatch === "team_b"
              ? 0
              : 0;
          draw =
            resultWinMatch === "team_a"
              ? 0
              : resultWinMatch === "team_b"
              ? 0
              : 1;
          lose =
            resultWinMatch === "team_a"
              ? 0
              : resultWinMatch === "team_b"
              ? 1
              : 0;
        } else {
          totalScoreTeamSet =
            formValues.set_1.team_b_set_1 +
            formValues.set_2.team_b_set_2 +
            formValues.set_3.team_b_set_3;

          totalCoScoreTeamSet =
            formValues.set_1.team_a_set_1 +
            formValues.set_2.team_a_set_2 +
            formValues.set_3.team_a_set_3;

          // totalDiffScore = totalScoreTeamSet - totalCoScoreTeamSet;

          point =
            resultWinMatch === "team_b"
              ? 3
              : resultWinMatch === "team_a"
              ? 0
              : 1;

          win =
            resultWinMatch === "team_a"
              ? 0
              : resultWinMatch === "team_b"
              ? 1
              : 0;
          draw =
            resultWinMatch === "team_a"
              ? 0
              : resultWinMatch === "team_b"
              ? 0
              : 1;
          lose =
            resultWinMatch === "team_a"
              ? 1
              : resultWinMatch === "team_b"
              ? 0
              : 0;
        }
        const { data, error } = await supabase.from("tbl_klasemen").insert({
          klasemen_uuid: uuidv4(),
          member_id: formValues[key].id,
          total_score: parseInt(totalScoreTeamSet),
          total_co_score: parseInt(totalCoScoreTeamSet),
          // diff_score: parseInt(dataKlasemenMember[0].diff_score),
          point: point,
          play: 1,
          win: win,
          draw: draw,
          lose: lose,
        });
      }
    }
  }

  if (dataPostResultMatch) {
    visibleAlertSuccess = true;
    getListResultMatch();
    openModalAddResultMatch();
    formValues = {
      team_a_player_1: [],
      team_a_player_2: [],
      team_b_player_1: [],
      team_b_player_2: [],
      set_1: {
        team_a_set_1: null,
        team_b_set_1: null,
      },
      set_2: {
        team_a_set_2: null,
        team_b_set_2: null,
      },
      set_3: {
        team_a_set_3: null,
        team_b_set_3: null,
      },
    };
  }
}

async function getOneMember(formValues) {
  let { data, error } = await supabase
    .from("tbl_klasemen")
    .select("*")
    .match({ member_id: formValues.id });

  return data;
}

async function listMember() {
  let { data, error } = await supabase.from("tbl_member").select("*");

  return data;
}

async function getListResultMatch() {
  let { data, error } = await supabase.from("tbl_result_match").select(
    `*,
        team_a_player_1:team_a_player_1_id(nama, id, member_uuid),
        team_a_player_2:team_a_player_2_id(nama, id, member_uuid),
        team_b_player_1:team_b_player_1_id(nama, id, member_uuid),
        team_b_player_2:team_b_player_2_id(nama, id, member_uuid)`
  );

  if (data) {
    dataListResultMatch = data;
  }
}

const dataListMember = listMember();

let isOpenModalResultMatch = false;

function openModalAddResultMatch() {
  isOpenModalResultMatch = !isOpenModalResultMatch;
}

if (visibleAlertSuccess === true) {
  setTimeout(() => {
    visibleAlertSuccess = false;
  }, 2000);
}
</script>

<Container>
  <Row>
    <Col>
      <Button color="primary" on:click="{openModalAddResultMatch}"
        >Add Result Match</Button>
      <Alert
        color="success"
        isOpen="{visibleAlertSuccess}"
        toggle="{() => (visibleAlertSuccess = false)}">
        Data saved successfully
      </Alert>
      <Modal
        body
        isOpen="{isOpenModalResultMatch}"
        header="Result Match"
        toggle="{openModalAddResultMatch}">
        <!-- <form on:submit|preventDefault={submitDataResultMatch}> -->
        <FormGroup>
          <Label for="team_a_player_1">Team A</Label>
          <Input
            type="select"
            name="team_a_player_1"
            id="team_a_player_1"
            bind:value="{formValues.team_a_player_1}">
            <option>Choose One</option>
            {#await dataListMember}
              <p>loading...</p>
            {:then payload}
              {#each payload as payload}
                <option value="{payload}">{payload.nama}</option>
              {/each}
            {/await}
          </Input>
          <Input
            type="select"
            name="team_a_player_2"
            id="team_a_player_2"
            bind:value="{formValues.team_a_player_2}">
            <option>Choose One</option>
            {#await dataListMember}
              <p>loading...</p>
            {:then payload}
              {#each payload as payload}
                <option value="{payload}">{payload.nama}</option>
              {/each}
            {/await}
          </Input>
          <Row>
            <Col>
              <Input
                type="number"
                name="team_a_set_1"
                id="team_a_set_1"
                placeholder="Set 1"
                bind:value="{formValues.set_1.team_a_set_1}" />
            </Col>
            <Col>
              <Input
                type="number"
                name="team_a_set_2"
                id="team_a_set_2"
                placeholder="Set 2"
                bind:value="{formValues.set_2.team_a_set_2}" />
            </Col>
            <Col>
              <Input
                type="number"
                name="team_a_set_3"
                id="team_a_set_3"
                placeholder="Set 3"
                bind:value="{formValues.set_3.team_a_set_3}" />
            </Col>
          </Row>
          <br />
          <h3 class="text-center">VS</h3>
          <br />
          <Label for="team_a_player_1">Team B</Label>
          <Input
            type="select"
            name="team_b_player_1"
            id="team_b_player_1"
            bind:value="{formValues.team_b_player_1}">
            <option>Choose One</option>
            {#await dataListMember}
              <p>loading...</p>
            {:then payload}
              {#each payload as payload}
                <option value="{payload}">{payload.nama}</option>
              {/each}
            {/await}
          </Input>
          <Input
            type="select"
            name="team_b_player_2"
            id="team_b_player_2"
            bind:value="{formValues.team_b_player_2}">
            <option>Choose One</option>
            {#await dataListMember}
              <p>loading...</p>
            {:then payload}
              {#each payload as payload}
                <option value="{payload}">{payload.nama}</option>
              {/each}
            {/await}
          </Input>
          <Row>
            <Col>
              <Input
                type="number"
                name="team_b_set_1"
                id="team_b_set_1"
                placeholder="Set 1"
                bind:value="{formValues.set_1.team_b_set_1}" />
            </Col>
            <Col>
              <Input
                type="number"
                name="team_b_set_2"
                id="team_b_set_2"
                placeholder="Set 2"
                bind:value="{formValues.set_2.team_b_set_2}" />
            </Col>
            <Col>
              <Input
                type="number"
                name="team_b_set_3"
                id="team_b_set_3"
                placeholder="Set 3"
                bind:value="{formValues.set_3.team_b_set_3}" />
            </Col>
          </Row>
        </FormGroup>
        <ModalFooter>
          <Button color="primary" on:click="{submitDataResultMatch}"
            >Save</Button>
          <Button color="secondary" on:click="{openModalAddResultMatch}"
            >Cancel</Button>
        </ModalFooter>
        <!-- </form> -->
      </Modal>
    </Col>
  </Row>
  <Row>
    <Col>
      {#await dataListResultMatch}
        <p>loading...</p>
      {:then payloadTable}
        <Table data="{payloadTable}" />
      {:catch error}
        <p style="color: red">{error.message}</p>
      {/await}
    </Col>
  </Row>
</Container>
