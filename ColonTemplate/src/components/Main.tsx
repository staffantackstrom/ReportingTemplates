import * as React from "react";

import { SectraRow, SectraSelect, SectraInput, SectraCheckButtonGroup, SectraCheckButton } from "@sectramedical/srt-components";
import { Tumor } from "./Tumor";
import { Col, Container, Row } from "react-bootstrap";


interface MainState {
	tumors: JSX.Element[],
	nextKey: number
}

export class Main extends React.Component<{}, MainState> {
	constructor(props: any) {
		super(props);
		this.addTumor = this.addTumor.bind(this);
		this.removeTumor = this.removeTumor.bind(this);
		this.state = {
			tumors: [<Tumor idExtension={1} removeFunction={this.removeTumor} key={1} keyId={1}/>],
			nextKey: 2
		}
	}

	addTumor() {
		this.setState((state) => {
			const key = state.tumors.length + 1;
			const newTumor = <Tumor idExtension={key} removeFunction={this.removeTumor} key={state.nextKey} keyId={state.nextKey} />;
			const tumors = state.tumors.splice(0);
			tumors.push(newTumor);
			return {tumors: tumors, nextKey: state.nextKey + 1}
		});
	}

	removeTumor(keyId: number) {
		this.setState((state) => {
			return {tumors: state.tumors.filter(elem => elem.key !== keyId.toString())};
		});
	}

	render() {
		const indentLevel = 1;
		let idExtension = 0;
		return (<div>
			<input type="text" data-custom-field-type="add/remove html" name="Number of tumors" value={this.state.tumors.length} hidden></input>
			<Container>
				<Row className="show-grid form-row">
					<Col xs={12}>
						<SectraRow labelFor="blood-artefacts" labelText="Blood artefacts">
							<SectraCheckButtonGroup>
								<SectraCheckButton id="thorax-buk" name="thorax-buk" value="0">DT Thorax/buk</SectraCheckButton>
								<SectraCheckButton id="thorax" name="thorax" value="0">DT Thorax</SectraCheckButton>
							</SectraCheckButtonGroup>
						</SectraRow>
						<SectraRow labelFor="adc" labelText="ADC">
							<SectraInput type="number" id="adc" name="ADC" bsSize="sm" step={0.001}></SectraInput> mm²/s
						</SectraRow>
					</Col>
				</Row>
			</Container>
			{this.state.tumors.map((elem: JSX.Element) => {
				idExtension += 1
				return <Container key={"grid" + elem.key}><Row className="show-grid form-row"><Col xs={12}>{React.cloneElement(elem, {idExtension: idExtension})}</Col></Row></Container>;
			})}
			<Container>
				<Row className="show-grid form-row">
					<Col xs={12}>
						<button id="add-tumor" className="btn btn-link chevron" onClick={this.addTumor}>+ Tumor</button>
					</Col>
				</Row>
			</Container>
			<br></br>
		</div>);
	}
}
