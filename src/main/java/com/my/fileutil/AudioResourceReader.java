package com.my.fileutil;

import java.io.File;
import java.io.IOException;
import java.net.URL;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.SourceDataLine;
import javax.sound.sampled.UnsupportedAudioFileException;

public final class AudioResourceReader {
	 /**
     *  The sample rate - 44,100 Hz for CD quality audio.
     */
    public static final int SAMPLE_RATE = 44100;

    private static final int BYTES_PER_SAMPLE = 2;                // 16-bit audio
    private static final int BITS_PER_SAMPLE = 16;                // 16-bit audio
    private static final double MAX_16_BIT = Short.MAX_VALUE;     // 32,767
    private static final int SAMPLE_BUFFER_SIZE = 4096;


    private static SourceDataLine line;   // to play the sound
    private static byte[] buffer;         // our internal buffer
    private static int bufferSize = 0;    // number of samples currently in internal buffer
    
    static {
    	init();
    }
    public static void init(){
    	 // 44,100 samples per second, 16-bit audio, mono, signed PCM, little Endian

        try {
        	AudioFormat format = new AudioFormat((float) SAMPLE_RATE, BITS_PER_SAMPLE, 1, true, false);
        	DataLine.Info info = new DataLine.Info(SourceDataLine.class, format);
			line = (SourceDataLine) AudioSystem.getLine(info);
			line.open(format, SAMPLE_BUFFER_SIZE * BYTES_PER_SAMPLE);
			// the internal buffer is a fraction of the actual buffer size, this choice is arbitrary
			// it gets divided because we can't expect the buffered data to line up exactly with when
			// the sound card decides to push out its samples.
			buffer = new byte[SAMPLE_BUFFER_SIZE * BYTES_PER_SAMPLE/3];
		} catch (LineUnavailableException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        // no sound gets made before this call
        line.start();
    }
    
    public static byte[] readByte(String filename){
    	byte[] data = null;
    	AudioInputStream ais = null;
    	try {
    		 // try to read from file
            File file = new File(filename);
            if (file.exists()) {
            	ais = AudioSystem.getAudioInputStream(file);
                int bytesToRead = ais.available();
                data = new byte[bytesToRead];
                int bytesRead = ais.read(data);
				if(bytesToRead != bytesRead){
					throw new RuntimeException("read only " + bytesRead + " of " + bytesToRead + " bytes");
				}
            }
		} catch (UnsupportedAudioFileException e) {
			  System.out.println(e.getMessage());
	          throw new RuntimeException(filename + " in unsupported audio format");
		} catch (IOException e) {
			 System.out.println(e.getMessage());
	         throw new RuntimeException("Could not read " + filename);
		} finally{
			if(ais!=null){
				try {
					ais.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
    	
    	return data;
    }
    
}
