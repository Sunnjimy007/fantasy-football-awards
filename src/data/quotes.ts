export const PLAYER_QUOTES: Record<string, string> = {
  Haaland:            "Numbers don't lie. Goals don't lie. This award is simply fact.",
  Salah:              "This is the truth. I have worked hard. And now, so has this person.",
  'Vinicius Jr':      "Magic! Pure magic! This is why we play the beautiful game!",
  Bellingham:         "I never doubted it for a second. Champions always deliver. Simple.",
  'Van Dijk':         "Solid. Composed. Deserved. Like a clean sheet in a final.",
  Kane:               "I've been waiting for this moment. We all have. Completely worth it.",
  Modric:             "Experience teaches you everything. This award teaches us that too.",
  'Bruno Fernandes':  "We must keep working, keep fighting, and celebrate this properly.",
  Muller:             "Ha! Yes! This is exactly what football is! Beautiful!",
  Son:                "I am so happy. Genuinely. This person deserves this. One hundred percent.",
  Saka:               "I'm buzzing. Genuinely buzzing. This is class, this is.",
  Griezmann:          "Magnifique! C'est parfait! Everything about this is absolutely perfect!",
  Yamal:              "I'm 17. I've seen a lot. This? This is special.",
  Pedri:              "We play, we suffer, we celebrate. Today, we celebrate.",
  Lewandowski:        "Every goal I score is important. Every award is also important.",
  'Cole Palmer':      "Yeah. Cool. Deserved, innit.",
  Odegaard:           "The team gives everything. The individual earns it. This is earned.",
  Martinelli:         "GOOOOOL! Oh wait — this is an award. Still feels like a goal!",
  Mbappe:             "Speed. Skill. Success. That is the formula. It works here too.",
  'De Bruyne':        "I saw the run, I played the pass, and now we have this award. Perfect.",
  'Phil Foden':       "It's just brilliant, isn't it. Absolutely brilliant.",
  'Trent Alexander-Arnold': "The detail. The precision. This award has both.",
  Diaz:               "Every day I work for moments like this. Every single day.",
  Kulusevski:         "I love this game. I love these moments. Let's go!",
  'Lautaro Martinez': "We fight as one. We win as one. This belongs to everyone.",
  Calhanoglu:         "The plan was perfect. We executed it perfectly. Naturally.",
}

export const ALL_QUOTES = Object.values(PLAYER_QUOTES)

export function getMockQuote(player: string): string {
  return (
    PLAYER_QUOTES[player] ??
    "This award? I accept it on their behalf. They know what they did."
  )
}
