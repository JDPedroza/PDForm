import "./App.css";
import { PDFDocument } from "pdf-lib";

function readFile(file) {
  return new Response(file).arrayBuffer();
}

function App() {
  const execute = async (file) => {
    // Load a PDF with form fields
    let endFile = await readFile(file);
    const pdfDoc = await PDFDocument.load(endFile);
    const form = pdfDoc.getForm();
    const titularNameField = form.getTextField("titular_name");
    const titularLastNameField = form.getTextField("titular_last_name");
    const titularLastNameField2 = form.getTextField("titular_last_name_2");
    const titularNidField = form.getTextField("titular_nid");
    const expeditionDateNidField = form.getTextField("expedition_date_nid");
    const dateBirthNidField = form.getTextField("date_birth_nid");
    const cityBirthNiField = form.getTextField("city_birth_nid");
    const sexMCheck = form.getCheckBox("sex_m");
    const sexFCheck = form.getCheckBox("sex_f");
	const typeIdCC = form.getRadioGroup("type_id_cc")



    /*
	titular_name
	titular_last_name
	titular_last_name_2
	titular_nid
	expedition_date_nid
	date_birth_nid
	city_birth_nid
	sex_m
	*/
    titularNameField.setText("Johan David");
    titularLastNameField.setText("Pedroza");
    titularLastNameField2.setText("Plazas");
    titularNidField.setText("1010237909");
    expeditionDateNidField.setText("06-02-2016");
    dateBirthNidField.setText("30-01-1998");
    cityBirthNiField.setText("Bogotá");
    sexFCheck.check();

    const pdfBytes = await pdfDoc.save();

    console.log("descargando");

    downloadBlob(pdfBytes, "prueba4.pdf", "application/octet-stream");
  };

  const downloadBlob = function (data, fileName, mimeType) {
    var blob, url;
    blob = new Blob([data], {
      type: mimeType,
    });
    url = window.URL.createObjectURL(blob);
    downloadURL(url, fileName);
    setTimeout(function () {
      return window.URL.revokeObjectURL(url);
    }, 1000);
  };

  const downloadURL = function (data, fileName) {
    var a;
    a = document.createElement("a");
    a.href = data;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = "display: none";
    a.click();
    a.remove();
  };

  return (
    <div className="App">
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          execute(file);
        }}
        id="icon-button-file-cc"
      />
    </div>
  );
}

export default App;
