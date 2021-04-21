import * as React from "react";

import { SectraRow, SectraSelect, SectraInput, SectraCheckButtonGroup, SectraCheckButton, SectraRadioButton } from "@sectramedical/srt-components";
import { KolonTumor } from "./KolonTumor";
import { RektalTumor } from "./RektalTumor";
import { Col, Container, Row } from "react-bootstrap";


interface MainState {
	tumors: JSX.Element[],
	nextKey: number
}

export class Main extends React.Component<{}, MainState> {
	constructor(props: any) {
		super(props);
		this.addKolonTumor = this.addKolonTumor.bind(this);
		this.addRektalTumor = this.addRektalTumor.bind(this);
		this.removeTumor = this.removeTumor.bind(this);
		this.state = {
			//tumors: [<KolonTumor idExtension={1} removeFunction={this.removeTumor} key={1} keyId={1}/>],
			tumors: [],
			nextKey: 1
		}
	}

	addKolonTumor() {
		this.setState((state) => {
			const key = state.tumors.length + 1;
			const newTumor = <KolonTumor idExtension={key} removeFunction={this.removeTumor} key={state.nextKey} keyId={state.nextKey}/>;
			const tumors = state.tumors.splice(0);
			tumors.push(newTumor);
			return {tumors: tumors, nextKey: state.nextKey + 1}
		});
	}

	addRektalTumor() {
		this.setState((state) => {
			const key = state.tumors.length + 1;
			const newTumor = <RektalTumor idExtension={key} removeFunction={this.removeTumor} key={state.nextKey} keyId={state.nextKey} />;
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
						<SectraCheckButtonGroup>
							<SectraRow labelFor="undersokningar" labelText="1. Undersokningar">
								<SectraCheckButton id="dtthoraxbuk" name="dtthoraxbuk" value="DT thorax/buk"></SectraCheckButton>
								<SectraCheckButton id="dtthorax" name="dtthorax" value="DT thorax"></SectraCheckButton>
								<SectraCheckButton id="petdt" name="petdt" value="PET/DT"></SectraCheckButton>
								<SectraCheckButton id="mrlillabackenet" name="mrlillabackenet" value="MRT lilla backenet"></SectraCheckButton>
								<SectraCheckButton id="dtbuk" name="dtbuk" value="DT buk"></SectraCheckButton>
								<SectraCheckButton id="lungrtg" name="lungrtg" value="Lungrtg"></SectraCheckButton>
								<SectraCheckButton id="mrtlever" name="mrtlever" value="MRT lever"></SectraCheckButton>
								<SectraCheckButton id="dtcolon" name="dtcolon" value="DT kolon"></SectraCheckButton>
								<SectraCheckButton id="ullever" name="ullever" value="Ultraljud lever"></SectraCheckButton>					
							</SectraRow>
							<SectraRow>
								<SectraCheckButton id="undersokningar_annan" name="undersokningar_annan" value="Annat"></SectraCheckButton>	
								<SectraInput type="string" id="undersokningar_annan_txt" name="undersokningar_annan_txt"></SectraInput>
							</SectraRow>
						</SectraCheckButtonGroup>
						<SectraRow labelFor="mdk" labelText="MDK-konferens datum">
							<SectraInput type="string" id="mdk" name="mdk"></SectraInput>
						</SectraRow>
						<SectraRow>
							<SectraCheckButton id="ingen_tumor_radiologiskt" name="ingen_tumor_radiologiskt" value="Ingen tumor avgransas radiologiskt"></SectraCheckButton>	
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
						<button id="add-tumor" className="btn btn-link chevron" onClick={this.addKolonTumor}>+ Colontumor</button>
						<button id="add-tumor" className="btn btn-link chevron" onClick={this.addRektalTumor}>+ Rektaltumor</button>
					</Col>
				</Row>
			</Container>
			<br></br>
		</div>);
	}
}
