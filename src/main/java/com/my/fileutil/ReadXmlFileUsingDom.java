package com.my.fileutil;

import java.io.File;
import java.io.IOException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.FactoryConfigurationError;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import com.my.model.VoipMediaKeys;
import com.my.model.VoipMediaModel;

public class ReadXmlFileUsingDom {

	public static Object parseXMLFile(String filepath, int protocol){
		System.out.println(protocol);
	   if(protocol == 9 ){
		   return parseXMLFileForVoip(filepath);
	   }
	   return null;
	}
	
	public static VoipMediaModel parseXMLFileForVoip(String filepath){
		VoipMediaModel model = new VoipMediaModel();
		File xmlFile = new File(filepath);
		try {
			DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
			
			DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
			
			Document document = documentBuilder.parse(xmlFile);
		
			System.out.println(document.getDocumentElement().getNodeName());

			setVoipDetailModel(document, model, filepath);
			
		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		} catch (FactoryConfigurationError e) {
			e.printStackTrace();
		} catch (SAXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return model;
	}
	
	public static void setVoipDetailModel(Document doc, VoipMediaModel model, String filename){
		String[] tokens = filename.split("\\\\");
		
		String pre = "";
		if(tokens.length > 7){
			for(int i = 4 ; i <= tokens.length-3; i+=2){
			    pre +=(i==4)? "\\":File.separator;
				pre += tokens[i];
			}
		}
		model.setConnnectionID(doc.getDocumentElement()
				              .getElementsByTagName(VoipMediaKeys.ConnectionID.name()).item(0).getTextContent());
		model.setCodec(doc.getDocumentElement().getElementsByTagName(VoipMediaKeys.Codec.name()).item(0).getTextContent());
		model.setFromFileName(pre +File.separator+ doc.getDocumentElement().getElementsByTagName(VoipMediaKeys.FromFilePath.name()).item(0).getTextContent());
		model.setFromSrcName( doc.getDocumentElement().getElementsByTagName(VoipMediaKeys.FromSSRC.name()).item(0).getTextContent());
		model.setToFileName(pre +File.separator+ doc.getDocumentElement().getElementsByTagName(VoipMediaKeys.ToFilePath.name()).item(0).getTextContent());
		model.setToSrcName(doc.getDocumentElement().getElementsByTagName(VoipMediaKeys.ToSSRC.name()).item(0).getTextContent());
		
	}
}
