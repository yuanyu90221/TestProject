package com.my.fileutil;


import java.io.File;
import java.io.IOException;

import org.apache.tomcat.util.http.fileupload.FileUtils;



public class FileCleaner implements Runnable{
    private String id;
    private String oldPath;
    private String newPath;
    private String fileName;
    
    public FileCleaner(String id, String fileName){
        this.id = id;
        this.fileName = fileName;
        oldPath = Common.PARSER_PATH + "\\" + id;
        newPath = Common.FILE_UPLOAD_PATH + "\\backup\\";
    }

    @Override
    public void run() {
        try {
            File oldFile = new File(oldPath + "\\" + fileName);
            if (oldFile.exists()){
                File newDir = new File(newPath);
                // if the "backup" directory does not exist, create it
                if (!newDir.exists()) {
                    newDir.mkdir();
                }
                newPath += id;
                newDir = new File(newPath);
                // create directory for the id
                if (!newDir.exists()) {
                    newDir.mkdir();
                }

                //move pcap
                oldFile.renameTo(new File(newPath + "\\" + fileName));
    
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
}