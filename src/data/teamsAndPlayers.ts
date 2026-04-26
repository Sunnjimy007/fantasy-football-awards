export const TEAMS_AND_PLAYERS: Record<string, string[]> = {
  Arsenal: ['Saka', 'Odegaard', 'Martinelli', 'Havertz'],
  Chelsea: ['Cole Palmer', 'Enzo Fernandez', 'Nicolas Jackson', 'Reece James'],
  Liverpool: ['Salah', 'Van Dijk', 'Trent Alexander-Arnold', 'Diaz'],
  'Man City': ['Haaland', 'De Bruyne', 'Bernardo Silva', 'Phil Foden'],
  'Man United': ['Bruno Fernandes', 'Hojlund', 'Rashford', 'Onana'],
  Tottenham: ['Son', 'Maddison', 'Richarlison', 'Kulusevski'],
  'Real Madrid': ['Vinicius Jr', 'Bellingham', 'Modric', 'Mbappe'],
  Barcelona: ['Yamal', 'Pedri', 'Lewandowski', 'Raphinha'],
  'Bayern Munich': ['Kane', 'Muller', 'Kimmich', 'Musiala'],
  PSG: ['Dembele', 'Barcola', 'Asensio', 'Pacho'],
  Juventus: ['Vlahovic', 'Yildiz', 'Locatelli', 'Bremer'],
  'Atletico Madrid': ['Griezmann', 'Simeone', 'De Paul', 'Oblak'],
  Dortmund: ['Guirassy', 'Brandt', 'Nmecha', 'Kobel'],
  Ajax: ['Brobbey', 'Henderson', 'Taylor', 'Wijndal'],
  'Inter Milan': ['Lautaro Martinez', 'Calhanoglu', 'Thuram', 'Barella'],
}

export const TEAMS = Object.keys(TEAMS_AND_PLAYERS).sort()
