import * as React from "react";
import { Collapse, Col, Grid, Row } from "react-bootstrap";

import { SectraRow, SectraInput, SectraSelect, SectraButtonGroup, SectraCheckButtonGroup, SectraCheckButton } from "@sectramedical/srt-components";
import { TumorTexts } from "./TumorTexts";
import { chevronOpen, chevronClosed } from "../images"


interface RektalTumorProps {
    idExtension: number;
    keyId: number;
    removeFunction: (id: number) => void;
}

interface RektalTumorState {
    open: boolean;
    annular: string;
    polypos: string;
    mucinos: string;
    tumorlangd: string;
    vaxtPerikolisktFett: string;
    tumorvaxtAntimesenteriellt: string;
    ingenTumorinfiltration: boolean;
    tumorinfiltrationFramreBukvagg: boolean;
    tumorinfiltrationRetroperitoneum: boolean;
    tumorinfiltrationUreter: boolean;
    tumorinfiltrationDuodenum: boolean;
    tumorinfiltrationTunntarm: boolean;
    tumorinfiltrationUrinblasa: boolean;
    tumorinfiltrationAnnat: string;
    emvi: string;
    antalLymfkortelmetastaser: string;
    storstaLymfkortelmetastas: string;
    lymfkortelInhomogenitet: boolean;
    lymfkortelKontur: boolean;
    lymfkortelStorlek: boolean;
    lymfkortelForm: boolean;
    tumordepositer: string;
}

interface T2Texts {
    peripheral: string[];
    transition: string[];
}

export class RektalTumor extends React.Component<RektalTumorProps, RektalTumorState> {
    private collapseDiv: React.Ref<HTMLDivElement>

    constructor(props: RektalTumorProps) {
        super(props);
        this.state = {
            open: true, annular: "", polypos: "", mucinos: "", tumorlangd: "", 
            vaxtPerikolisktFett: "", tumorvaxtAntimesenteriellt: "",
            ingenTumorinfiltration: false,
            tumorinfiltrationFramreBukvagg: false, tumorinfiltrationRetroperitoneum: false,
            tumorinfiltrationUreter: false, tumorinfiltrationDuodenum: false,
            tumorinfiltrationTunntarm: false, tumorinfiltrationUrinblasa: false,
            tumorinfiltrationAnnat: "",
            emvi: "",
            antalLymfkortelmetastaser: "", storstaLymfkortelmetastas: "",
            lymfkortelInhomogenitet: false, lymfkortelKontur: false,
            lymfkortelStorlek: false, lymfkortelForm: false,
            tumordepositer: ""
        };
        this.collapse = this.collapse.bind(this);
        this.remove = this.remove.bind(this);
        //this.updateT2Text = this.updateT2Text.bind(this);

        this.collapseDiv = React.createRef();
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

   /* updateT2Text(t2Val: string) {
        const t2Index = parseInt(t2Val) - 1;
        this.setState(state => {
            const textArr = state.zone === "Peripheral" ? TumorTexts.T2_TEXTS.peripheral : state.zone === "Transition" ? TumorTexts.T2_TEXTS.transition : "";
            const newPiradsVal = this.calculatePiradsVal(state.zone, state.dwiVal, t2Val, state.dceVal, state.piradsVal);
            return {t2Text: textArr[t2Index], t2Val: t2Val, piradsVal: newPiradsVal};
        });
    }_*/

    /*updatePirads(piradsVal: string) {
        this.piradsElement = React.cloneElement(this.piradsElement, {checkedButton: piradsVal});
        this.setState({piradsVal: piradsVal});
    }*/

    render() {
        const nejJa = ["Nej", "Ja"];
        const indentLevel = 1;

        return (
            <div>
                <label htmlFor={"a" + this.props.idExtension}></label>
                <input type="hidden" data-field-type="text" id={"a" + this.props.idExtension} name={"a" + this.props.idExtension} value=" "></input>
                <input type="hidden" name={"Tumor " + this.props.idExtension} data-field-type="text" value=" "></input>
                <Grid><Row className="show-grid"><Col xs={4} style={{paddingLeft: 0}}>
                <button className="btn btn-link chevron" onClick={this.collapse}>Tumor {this.props.idExtension} <img src={this.state.open ? chevronOpen : chevronClosed}></img></button>
                </Col><Col xs={7}>
                <Collapse in={!this.state.open}>
                    <div>
                        Rektaltumor 
                    </div>
                </Collapse></Col>
                <Col xs={1}>
                    <button className="btn btn-link chevron pull-right" onClick={this.remove}>X</button>
                </Col>
                </Row></Grid>
                <Collapse in={this.state.open}>
                <div>
                <div className="">
                        <SectraRow labelFor="annular" labelText="5. Annular">
                            <SectraInput type="text" bsSize="xl" id="annular" name="annular" value={this.state.annular} hidden></SectraInput>
                            <SectraButtonGroup name="annulars" buttonValues={nejJa} preventOutput={true}></SectraButtonGroup>
                        </SectraRow>
                        <SectraRow labelFor="polypos" labelText="5. Polypos">
                            <SectraInput type="text" bsSize="xl" id="polypos" name="polypos" value={this.state.polypos} hidden></SectraInput>
                            <SectraButtonGroup name="polyposs" buttonValues={["Nej", "Ja"]} preventOutput={true}></SectraButtonGroup>
                        </SectraRow>
                        <SectraRow labelFor="mucinos" labelText="8. Mucinos">
                            <SectraInput type="text" bsSize="xl" id="mucinos" name="mucinos" value={this.state.mucinos} hidden></SectraInput>
                            <SectraButtonGroup name="polyposs" buttonValues={["Nej", "Ja"]} preventOutput={true}></SectraButtonGroup>
                        </SectraRow>
                        <SectraRow labelFor="lokalisation" labelText="6. Lokalisation">
                            <SectraCheckButtonGroup>
                                <SectraCheckButton id="lokalisation_sigmoideum" name="lokalisation_sigmoideum" value="Sigmoideum"></SectraCheckButton>
                                <SectraCheckButton id="lokalisation_descendens" name="lokalisation_descendens" value="Descendens"></SectraCheckButton>
                                <SectraCheckButton id="lokalisation_flexura_lienalis" name="lokalisation_flexura_lienalis" value="Flexura lienalis"></SectraCheckButton>
                                <SectraCheckButton id="lokalisation_transversum" name="lokalisation_transversum" value="Transversum"></SectraCheckButton>
                                <SectraCheckButton id="lokalisation_flexura_hepatica" name="lokalisation_flexura_hepatica" value="Flexura hepatica"></SectraCheckButton>
                                <SectraCheckButton id="lokalisation_ascendens" name="lokalisation_ascendens" value="Ascendens"></SectraCheckButton>
                                <SectraCheckButton id="lokalisation_caekum" name="lokalisation_caekum" value="Ceakum"></SectraCheckButton>
                                <SectraCheckButton id="lokalisation_appendix" name="lokalisation_appendix" value="Appendix"></SectraCheckButton>
                            </SectraCheckButtonGroup>
                        </SectraRow>
                        <SectraRow labelFor="tumor_langd" labelText="7. Tumorens langd (mm)">
                            <SectraInput type="text" bsSize="xl" id="tumor_langd" name="tumor_langd" value={this.state.tumorlangd}></SectraInput>
                        </SectraRow>
                        <SectraRow labelFor="vaxt_utanfor_tarmvagg" labelText="9. Begransas till tarmvaggen">
                            <SectraCheckButton id="begransas_till_tarmvagg" name="begransas_till_tarmvagg" value="Ja"></SectraCheckButton>
                            <SectraInput type="text" bsSize="xl" id="bvaxt_utanfor_tarmvagg" name="Vaxt ut i perikoliska fettet, mm extramural utlopare" value={this.state.vaxtPerikolisktFett}></SectraInput>    
                        </SectraRow>
                        <SectraRow labelFor="tumorvaxt_antimesenteriellt" labelText="10. Tumorvaxt genom tarmvaggen pa den antimesenteriella sida">
                            <SectraInput type="text" bsSize="xl" id="tumorvaxt_antimesenteriellt" name="tumorvaxt_antimesenteriellt" value={this.state.tumorvaxtAntimesenteriellt} hidden></SectraInput>
                            <SectraButtonGroup name="tumorvaxt_antimesenteriellts" buttonValues={["Nej", "Ja"]} preventOutput={true}></SectraButtonGroup>
                        </SectraRow>
                        <SectraRow labelFor="infiltration" labelText="11. Tumor infiltrerar angransande organ">
                            <SectraCheckButtonGroup>
                                <SectraCheckButton id="ingen_infiltration" name="ingen_infiltration" value="Nej"></SectraCheckButton>
                                <SectraCheckButton id="infiltration_framre_bukvagg" name="infiltration_freamre_bukvagg" value="Framre bukvagg"></SectraCheckButton>
                                <SectraCheckButton id="infiltration_retroperitoneum" name="infiltration_retroperitoneum" value="Retroperitoneum"></SectraCheckButton>
                                <SectraCheckButton id="infiltration_ureter" name="infiltration_ureter" value="Ureter"></SectraCheckButton>
                                <SectraCheckButton id="infiltration_duodenum" name="infiltration_duodenum" value="Duodenum"></SectraCheckButton>
                                <SectraCheckButton id="infiltration_tunntarm" name="infiltration_tunntarm" value="Tunntarm"></SectraCheckButton>
                                <SectraCheckButton id="infiltration_urinblasa" name="infiltration_urinblasa" value="Urinblasaa"></SectraCheckButton>
                            </SectraCheckButtonGroup>
                            <SectraInput type="text" bsSize="xl" id="annan_tumorinfiltration" name="annan_tumorinfiltration" value={this.state.tumorinfiltrationAnnat}></SectraInput>
                        </SectraRow>
                    </div>  
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={4}></Col>
                            <Col xs={8}><div className="template-group"></div></Col>
                        </Row>
                    </Grid>
                </div>
                </Collapse>
            </div>
        );
    }
}
