import { Principal } from "@dfinity/principal";
import { icticket } from "../../declarations/icticket";

// serialize all the form
const allFormWrap = Array.from(document.querySelectorAll('.form-wrap'));

allFormWrap.forEach((section) => {
  // interact form on submit 
  const form = section.querySelector('form');
  form.onsubmit = async (e) => {
    e.preventDefault();
    // input field 
    const input = section.querySelector('input');
    let inputValue = undefined;
    if (input) {
      inputValue = input.value.toString();
    }
    
    // output 
    const output = section.querySelector('#greeting');

    // click type 
    const formType = form.getAttribute('data-form');
    // disable submit btn 
    const submitBtn = e.target.querySelector('button');
    submitBtn.setAttribute("disabled", true);
    switch (formType.toLowerCase()) {
      case 'whoami':
        output.innerHTML = (await icticket.whoami()).toText();
        break;
        case 'generate':
        let genPrincipal = Principal.fromText(inputValue);
        let val = await icticket.generate(genPrincipal);
        if (val.ok) {
          output.innerHTML = ` variant {ok: ${val.ok}}`
        } else {
          output.innerHTML = ` variant {error: ${val.err}}`
        }
        break;
      case 'getowner':
       
        let api = await icticket.getOwner(Number(inputValue));
        output.innerHTML = api[0].owner.toString()
        break;
      case 'greet':
        output.innerHTML = await icticket.greet(inputValue);
        break;
      case 'mulgenerate':
        let mulGenPrincipal = Principal.fromText(inputValue);
        const natValue = Number(section.querySelector('#nat').value);
        let apiResponse = await icticket.multipleGenerate(mulGenPrincipal, BigInt(natValue))
        output.innerHTML = ` <p style="width: 100%; word-break: break-word;">vec = {${apiResponse.toString()}}</p> `
        break;
    }

    // enable btn 
    submitBtn.removeAttribute("disabled");

  }
})


