<script>
import { Col, Container, Row } from "sveltestrap";
import versusIcon from "../images/vs.png";
import klasemenIcon from "../images/klasemen.png";
</script>

<Container>
  <Row style="text-align:center;">
    <Col
      ><a href="/member"
        ><img
          src="https://img.icons8.com/office/80/000000/crowd.png"
          alt="people" />
      </a></Col>
    <Col
      ><a href="/klasemen"
        ><img
          src="{klasemenIcon}"
          alt="klasemen"
          style="width: 80px; height: 80px" /></a
      ></Col>
  </Row>
  <Row style="text-align:center; margin-bottom:3em">
    <Col>Member</Col>
    <Col>Table Klasemen</Col>
  </Row>
  <Row style="text-align:center;">
    <Col
      ><a href="/result"
        ><img
          src="{versusIcon}"
          alt="result"
          style="width: 80px; height: 80px" /></a
      ></Col>
  </Row>
  <Row style="text-align:center; margin-bottom:3em">
    <Col>Result Match</Col>
  </Row>
</Container>
