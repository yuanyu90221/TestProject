package com.my.fileutil;

import java.io.File;
//import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

import org.apache.tomcat.util.http.fileupload.FileUtils;


public class FileRecover implements Runnable{
    private String id;
    private String oldPath;
    private String newPath;
    private String oldFileName;
    private String newFileName;
    
    public FileRecover(String id, String oldFileName, String newFileName){
        this.id = id;
        this.oldFileName = oldFileName;
        this.newFileName = newFileName;

        oldPath = Common.FILE_UPLOAD_PATH + "\\backup\\" + id;
        newPath = Common.FILE_UPLOAD_PATH + "\\";
    }

    @Override
    public void run() {
        try {
            File oldFile = new File(oldPath + "\\" + oldFileName);
            if (oldFile.exists()){
                //move pcap
                oldFile.renameTo(new File(newPath + "\\" + newFileName));
                //Create ok file
                createOkFile(id, newFileName);
    
                //delete old files
                FileUtils.deleteDirectory(new File(oldPath));
            }
        } catch (SecurityException  e) {
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    /**
     * Create Ok File
     * @param id
     * @param fileName
     */
    private void createOkFile(String id, String fileName){
        Writer writer = null;
        String text = OkFileData(id, fileName);

        try {
            fileName = fileName.replaceAll("pcap", "ok");
            writer = new FileWriter(newPath + "\\" + fileName);
            writer.write(text);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (writer  != null) {
                    writer .close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * Create data of Ok file
     * @param id
     * @param fileName
     * @return
     */
    private String OkFileData(String id, String fileName){
        return String.format("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\n"
                + "<pcap>\n"
                + "    <ImportLogSN>%s</ImportLogSN>\n"
                + "    <FileName>%s</FileName>\n"
                + "</pcap>\n", id, fileName);
    }
}