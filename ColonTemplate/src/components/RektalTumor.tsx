import * as React from "react";
import { Collapse, Col, Container, Row } from "react-bootstrap";

import { SectraRow, SectraInput, SectraSelect, SectraButtonGroup } from "@sectramedical/srt-components";
import { TumorTexts } from "./TumorTexts";


interface RektalTumorProps {
    idExtension: number;
    keyId: number;
    removeFunction: (id: number) => void;
}

interface RektalTumorState {
    open: boolean;
    zone: string;
    t2Val: string;
    t2Text: string;
    dwiText: string;
    dwiVal: string;
    piradsVal: string;
    dceVal: string;
    epeVal: string;
    sviVal: string;
}

interface T2Texts {
    peripheral: string[];
    transition: string[];
}

export class RektalTumor extends React.Component<RektalTumorProps, RektalTumorState> {
    private collapseDiv: React.Ref<HTMLDivElement>
    private oneToFive = ["1", "2", "3", "4", "5"];
    private piradsId = "pirads" + this.props.idExtension;
    private piradsElement : JSX.Element;
    constructor(props: RektalTumorProps) {
        super(props);
        this.state = {open: false, zone: "", t2Text: "", t2Val: "", dwiText: "", dwiVal: "", piradsVal: "", dceVal: "", epeVal: "", sviVal: ""};
        this.collapse = this.collapse.bind(this);
        this.remove = this.remove.bind(this);
        this.updateT2Text = this.updateT2Text.bind(this);
        this.updateDwiText = this.updateDwiText.bind(this);
        this.updateZone = this.updateZone.bind(this);
        this.updateDce = this.updateDce.bind(this);
        this.updatePirads = this.updatePirads.bind(this);
        this.collapseDiv = React.createRef();

        this.piradsElement = <SectraButtonGroup name={this.piradsId + "s"} buttonValues={this.oneToFive} checkedButton={""} key={"pirad" + this.props.keyId} onStateChange={this.updatePirads} preventOutput={true}></SectraButtonGroup>
    }

    calculatePiradsVal(zone: string, dwi: string, t2: string, dce: string, currentVal: string) {
        if (zone === "Peripheral" ) {
            if (dce.toLowerCase() === "early enhancement" && dwi === "3") {
                return "4";
            }
            return dwi ? dwi : currentVal;
        }
        else if (zone === "Transition") {
            if(dwi === "5" && t2 === "3") {
                return "4";
            }
            return t2 ? t2 : currentVal; 
        }
        else {
            return currentVal;
        }
    }

    collapse(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState({open: !this.state.open})
    }

    remove(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.removeFunction(this.props.keyId);
    }

    updateT2Text(t2Val: string) {
        const t2Index = parseInt(t2Val) - 1;
        this.setState(state => {
            const textArr = state.zone === "Peripheral" ? TumorTexts.T2_TEXTS.peripheral : state.zone === "Transition" ? TumorTexts.T2_TEXTS.transition : "";
            const newPiradsVal = this.calculatePiradsVal(state.zone, state.dwiVal, t2Val, state.dceVal, state.piradsVal);
            this.piradsElement = React.cloneElement(this.piradsElement, {checkedButton: newPiradsVal});
            return {t2Text: textArr[t2Index], t2Val: t2Val, piradsVal: newPiradsVal};
        });
    }

    updateDwiText(dwiVal: string) {
        const dwiIndex = parseInt(dwiVal) - 1;
        this.setState(state => {
            const newPiradsVal = this.calculatePiradsVal(state.zone, dwiVal, state.t2Val, state.dceVal, state.piradsVal);
            this.piradsElement = React.cloneElement(this.piradsElement, {checkedButton: newPiradsVal});
            return {dwiText: TumorTexts.DWI_TEXTS[dwiIndex], dwiVal: dwiVal, piradsVal: newPiradsVal};
        });
    }

    updateDce(dceVal: string) {
        this.setState(state => {
            const newPiradsVal = this.calculatePiradsVal(state.zone, state.dwiVal, state.t2Val, dceVal, state.piradsVal);
            this.piradsElement = React.cloneElement(this.piradsElement, {checkedButton: newPiradsVal});
            return {dceVal: dceVal, piradsVal: newPiradsVal};
        });
    }

    updateZone(zone: string) {
        this.setState(state => {
            const t2Index = parseInt(state.t2Val) - 1;
            const t2Arr = zone === "Peripheral" ? TumorTexts.T2_TEXTS.peripheral : TumorTexts.T2_TEXTS.transition;
            const newPiradsVal = this.calculatePiradsVal(zone, state.dwiVal, state.t2Val, state.dceVal, state.piradsVal);
            this.piradsElement = React.cloneElement(this.piradsElement, {checkedButton: newPiradsVal});
            return {t2Text: t2Arr[t2Index], zone: zone, piradsVal: newPiradsVal};
        });
    } 

    updatePirads(piradsVal: string) {
        this.piradsElement = React.cloneElement(this.piradsElement, {checkedButton: piradsVal});
        this.setState({piradsVal: piradsVal});
    }

    private getMaxIndex(arr: Array<number>) {
        return arr.reduce((maxIndex, x, i, arr) => x > arr[maxIndex] ? i : maxIndex, 0);
    }

    render() {
        const locationId = "location" + this.props.idExtension;
        const zoneId = "zone" + this.props.idExtension;
        const sizeId = "size" + this.props.idExtension;
        const t2Id = "t2" + this.props.idExtension;
        const dwiId = "dwi" + this.props.idExtension;
        const dceId = "dce" + this.props.idExtension;
        const epeId = "epe" + this.props.idExtension;
        const sviId = "svi" + this.props.idExtension;
        const sectorId = "sector" + this.props.idExtension;
        const yesNoEq = ["Yes", "No", "Equivalent"];
        const indentLevel = 1;
        const piradsVal = this.state.piradsVal;
        let defaultZone = null;
        let sector = null;

        return (
            <div>
                <label htmlFor={"a" + this.props.idExtension}></label>
                <input type="hidden" data-field-type="text" id={"a" + this.props.idExtension} name={"a" + this.props.idExtension} value=" "></input>
                <input type="hidden" name={"Tumor " + this.props.idExtension} data-field-type="text" value=" "></input>
                <Container><Row className="show-grid"><Col xs={4} style={{paddingLeft: 0}}>
                <button className="btn btn-link chevron" onClick={this.collapse}>Tumor {this.props.idExtension} <img src={this.state.open ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwAAADsABataJCQAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xNzNun2MAAACcSURBVDhPYxhC4PmLV2qPnzxrOXb85MHbd+71gfhQKTjAqgZI1APxfxi+/+DRBrAEFIDYT5+9WIys5sHDxx0giQZkQRCGaQZhdE0gfPnKtdlgE2/cvH0aXRKkGZsmoNonQBriIhADm2Z0jKIJBkACQIkzyAqRMVZNMACSwKYZryYYAClA1kyUJhgAKbx0+erc02fOrSZaE40BAwMA5cYxOfvW6lgAAAAASUVORK5CYII=" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOvwAADr8BOAVTJAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xNzNun2MAAACVSURBVDhPY0AGz1+8Unvw8HHH5SvXZoPYUGHC4Pade31ADf9B+MbN20+I1nzs+MmDMI0kaX785FkLskaiNYMUPH32YjGyRhAeOM2nz5xbDVWCHYA03n/waAO6xkuXr86FKsEEuDQBnXoGJAdVhgpAEiRrAgHkBEC0JhDAkgBOE9QEAsgJgGhNIABSCMT1QNyAXxMDAwCUfDE5J6RWDwAAAABJRU5ErkJggg=="}></img></button>
                </Col><Col xs={7}>
                <Collapse in={!this.state.open}>
                    <div>
                        {this.piradsElement}
                    </div>
                </Collapse></Col>
                <Col xs={1}>
                    <button className="btn btn-link chevron pull-right" onClick={this.remove}>X</button>
                </Col>
                </Row></Container>
                <Collapse in={this.state.open}>
                <div>
                    <div className="">
                        <SectraRow labelFor={zoneId} labelText="Zone">
                            <SectraInput type="text" bsSize="xl" id={zoneId} name={zoneId} value={this.state.zone} hidden></SectraInput>
                            <SectraButtonGroup name={zoneId + "s"} buttonValues={["Peripheral", "Transition"]} checkedButton={defaultZone} onStateChange={this.updateZone} preventOutput={true}></SectraButtonGroup>
                        </SectraRow>
                        <SectraRow labelFor={sectorId} labelText="Largest part in sector">
                            <p id={sectorId}>{sector}</p>
                        </SectraRow>
                        
                        <SectraRow labelFor={epeId} labelText="EPE">
                            <SectraInput type="text" id={epeId} name={epeId} value={this.state.epeVal} bsSize="xl" hidden></SectraInput>
                            <SectraButtonGroup name={epeId + "s"} buttonValues={yesNoEq} onStateChange={(s: string) => this.setState({epeVal: s})} preventOutput={true}></SectraButtonGroup>
                        </SectraRow>
                        <SectraRow labelFor={sviId} labelText="SVI">
                            <SectraInput type="text" id={sviId} name={sviId} value={this.state.sviVal} bsSize="xl" hidden></SectraInput>
                            <SectraButtonGroup name={sviId + "s"} buttonValues={yesNoEq} onStateChange={(s: string) => this.setState({sviVal: s})} preventOutput={true}></SectraButtonGroup>
                        </SectraRow>
                    </div>
                    <Container>
                        <Row className="show-grid">
                            <Col xs={4}></Col>
                            <Col xs={8}><div className="template-group"></div></Col>
                        </Row>
                    </Container>
                    <div className="">
                        <SectraRow labelFor={t2Id} labelText="T2">
                            <SectraButtonGroup id={t2Id} name={t2Id} buttonValues={this.oneToFive} onStateChange={this.updateT2Text} preventOutput={true}></SectraButtonGroup>
                            <p>{this.state.t2Text}</p>
                        </SectraRow>
                        <SectraRow labelFor={dwiId} labelText="DWI">
                            <SectraButtonGroup id={dwiId} name={dwiId} buttonValues={this.oneToFive} onStateChange={this.updateDwiText} preventOutput={true}></SectraButtonGroup>
                            <p>{this.state.dwiText}</p>
                        </SectraRow>
                        <SectraRow labelFor={dceId} labelText="DCE">
                            <SectraButtonGroup id={dceId} name={dceId} buttonValues={["Absent", "Early enhancement", "No enhancement"]} onStateChange={this.updateDce} checkedButton="abcent" preventOutput={true}></SectraButtonGroup>
                        </SectraRow>
                        <SectraRow labelFor={this.piradsId} labelText="PIRADS">
                            <SectraInput type="text" bsSize="xl" value={this.state.piradsVal} name={this.piradsId} id={this.piradsId} hidden></SectraInput>
                            {this.piradsElement}
                        </SectraRow>
                    </div>
                </div>
                </Collapse>
            </div>
        );
    }
}
