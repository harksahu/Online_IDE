import React, { useState } from "react";
import { Button } from "react-bootstrap"
import axios from "axios";
// compiler
function Textarea() {
    const [code, setCode] = useState()
    const [Input, setInput] = useState()
    const [language, setLanguage] = useState("C")
    const [InputRequired, setInputRequired] = useState("false")
    const [output, setOutput] = useState()
    const Runner = () => {
        const data = {
            code: code, 
            input: Input, 
            inputRatio: InputRequired, 
            lang: language
        }
        axios.post("http://localhost:8080/compiler",data)
    }
    return (
        <div className="Textarea">
            <h1> Write a code here</h1>
            <textarea rows="15" cols="150" onChange={(e) => {
                setCode(e.target.value)
            }} > </textarea>
            <div style={{ display: "flex", width: "60%", margin: "auto", flexWrap: "wrap", gap: "20px" }}>
                {/* <div> */}
                <div>

                    <h6> Write a Input here</h6>
                    <textarea rows="5" cols="50" onChange={(e) => {
                        setInput(e.target.value)
                    }} > </textarea>

                </div>
                <div>
                    <h4>select language</h4>
                    <select name="lang" id="lang" onChange={(e) => {
                        setLanguage(e.target.value)
                    }}>
                        <option value="C">C</option>
                        <option value="Java">Java</option>
                        <option value="Python">Python</option>
                    </select>
                </div>
                <div>
                    <h4>Input is required</h4>

                    <input type="radio" name="inputValue" id="InputValue" value="true" onChange={(e) => {
                        setInputRequired(e.target.value)
                    }} />Yes
                    <input type="radio" name="inputValue" id="InputValue" value="false" onChange={(e) => {
                        setInputRequired(e.target.value)
                    }} />No
                </div>

            </div>
            <Button onClick={() => {
                Runner()
            }}>Run</Button><br />
            <textarea rows="8" cols="150" onChange={(e) => {
                setOutput(e.target.value)
            }} > </textarea>
        </div>
    );
}

export default Textarea;
