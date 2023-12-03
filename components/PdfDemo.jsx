"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
  Image,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from 'file-saver';
/* import ExperienceProModel from './ExperienceProModel';
 */


import { FaBeer } from 'react-icons/fa';



function _buildExperienceItem(e) {
  return (
    <View style={{ marginBottom: "10px " }}>
      <Text style={{ fontWeight: "bold", fontSize: "18px" }}>{e.name} </Text>
      <Text style={{ fontWeight: "semibold" }}>{e.company} </Text>
      <Text style={{ opacity: "0.8" }}>{e.period} </Text>
      <Text>{e.content} </Text>
    </View>
  );
}
const generatePdfDocument = async (documentData,fileName) => {
  const blob = await pdf((
      <MyDocument
      name={"kris"}
          title='My PDF'
          pdfDocumentData={documentData}
      />
  )).toBlob();
  saveAs(blob, fileName);
};


function PdfBuilder({color}) {

  // Create styles
const styles = StyleSheet.create({
  page: { backgroundColor: color , width:"1OO%", height:"100%" },
  section: { textAlign: "center", margin: 0, color: "white", padding:10, width:"100%" },
});


const MyDocument = ({name}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
<View style={{display:"flex", flexDirection:"row" ,flexGrow:1 , flexShrink:1}}>
<View fixed style={{width:200, height:"100%", backgroundColor:"#fff",flexGrow:1 , flexShrink:1, display:"flex",}} >

</View>
<View style={styles.section}>
        <Text> 
Lorem ipsum dolor sit amet consectetur adipisicing elit.  </Text>
    </View>
      
</View>

       
    </Page>
  </Document>
);


  const [isClient, setIsClient] = useState(false);
  const [textUrl, setTextUrl] = useState("");
  const showPDF = (e) => {
    setTextUrl(e.target.href);
  };

  useEffect(() => {
    setIsClient(true);

    if (isClient) {
      // console.log(document.getElementById("PDFDownloadLink"));
    }
  }, [isClient]);
  return (
    <div>
      <Link href={`${textUrl}`}>
        <p>{textUrl}</p>
      </Link>
      {/*         {isClient && 
  <PDFViewer width="100%" height="800px">
      <MyDocument/>

      </PDFViewer>  
      
      } */}

{isClient && 

<PDFViewer 
showToolbar={false}
width="100%" height="100%"
id="pdf-section"
className="d-flex bg-slate-300 flex-column align-items-center"
>
 
 
       <MyDocument/>
 
</PDFViewer>



/*   <PDFViewer width="100%" height="1000px">

      </PDFViewer>   */
      
      }
     {/*  {isClient && <div>
        <MyDocument />
       <button onClick={() =>generatePdfDocument()} >generatePdfDocument</button>
        </div>} */}
    </div>
  );
}
export default PdfBuilder;







