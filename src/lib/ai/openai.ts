import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function transcribeAudio(audioFile: File | Buffer) {
  const transcription = await openai.audio.transcriptions.create({
    file: audioFile as any, // OpenAI SDK expects a specific file type
    model: 'whisper-1',
    response_format: 'verbose_json',
    timestamp_granularities: ['word', 'segment'],
  });
  return transcription;
}

export async function detectViralMoments(transcript: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are an expert social media strategist. Analyze the following transcript and identify the most viral, engaging, or emotional moments. 
        For each moment, provide:
        1. Start and end time (in seconds)
        2. A catchy viral title
        3. A hook for the beginning of the clip
        4. A viral score (1-10)
        5. Why it's viral
        
        Return the response as a JSON array of objects.`
      },
      {
        role: 'user',
        content: transcript
      }
    ],
    response_format: { type: 'json_object' }
  });

  return JSON.parse(response.choices[0].message.content || '{"moments": []}');
}

export async function generateSocialMetadata(clipTranscript: string) {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `Generate a TikTok/Reels description, hashtags, and a hook for the following clip transcript. Return as JSON.`
          },
          {
            role: 'user',
            content: clipTranscript
          }
        ],
        response_format: { type: 'json_object' }
      });
    
      return JSON.parse(response.choices[0].message.content || '{}');
}
