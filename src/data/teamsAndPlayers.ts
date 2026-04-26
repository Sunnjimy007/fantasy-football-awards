export const TEAMS_AND_PLAYERS: Record<string, string[]> = {
  Arsenal:          ['Saka', 'Odegaard', 'Martinelli', 'Havertz', 'Rice', 'Saliba', 'White', 'Raya', 'Trossard', 'Merino'],
  Chelsea:          ['Cole Palmer', 'Enzo Fernandez', 'Nicolas Jackson', 'Reece James', 'Caicedo', 'Gusto', 'Nkunku', 'Madueke', 'Sanchez', 'Colwill'],
  Liverpool:        ['Salah', 'Van Dijk', 'Diaz', 'Nunez', 'Mac Allister', 'Gravenberch', 'Gakpo', 'Szoboszlai', 'Jota', 'Gomez'],
  'Man City':       ['Haaland', 'Phil Foden', 'Bernardo Silva', 'Rodri', 'Gvardiol', 'Doku', 'Savinho', 'Dias', 'Walker', 'Ederson'],
  'Man United':     ['Bruno Fernandes', 'Hojlund', 'Garnacho', 'Mainoo', 'Onana', 'Dalot', 'Maguire', 'Yoro', 'Mount', 'Eriksen'],
  Tottenham:        ['Son', 'Maddison', 'Kulusevski', 'Solanke', 'Romero', 'Porro', 'Sarr', 'Bentancur', 'Johnson', 'Gray'],
  'Real Madrid':    ['Vinicius Jr', 'Bellingham', 'Mbappe', 'Valverde', 'Modric', 'Camavinga', 'Rudiger', 'Tchouameni', 'Endrick', 'Trent Alexander-Arnold'],
  Barcelona:        ['Yamal', 'Pedri', 'Lewandowski', 'Raphinha', 'Gavi', 'De Jong', 'Olmo', 'Kounde', 'Balde', 'Cubarsi'],
  'Bayern Munich':  ['Kane', 'Kimmich', 'Musiala', 'Neuer', 'Sane', 'Goretzka', 'Olise', 'Upamecano', 'Coman', 'Guerreiro'],
  PSG:              ['Dembele', 'Barcola', 'Donnarumma', 'Hakimi', 'Neves', 'Zaire-Emery', 'Lee Kang-in', 'Pacho', 'Doue', 'Asensio'],
  Juventus:         ['Vlahovic', 'Yildiz', 'Locatelli', 'Koopmeiners', 'Cambiaso', 'Di Gregorio', 'Conceicao', 'Khephren Thuram', 'McKennie', 'Savona'],
  'Atletico Madrid':['Griezmann', 'De Paul', 'Oblak', 'Sorloth', 'Gallagher', 'Gimenez', 'Llorente', 'Correa', 'Le Normand', 'Reinildo'],
  Dortmund:         ['Guirassy', 'Brandt', 'Kobel', 'Adeyemi', 'Schlotterbeck', 'Can', 'Sabitzer', 'Ryerson', 'Nmecha', 'Gross'],
  Ajax:             ['Brobbey', 'Berghuis', 'Sutalo', 'Rensch', 'Taylor', 'Wijndal', 'Fitz-Jim', 'Forbs', 'Rasmussen', 'Gaaei'],
  'Inter Milan':    ['Lautaro Martinez', 'Calhanoglu', 'Thuram', 'Barella', 'Dimarco', 'Bastoni', 'Sommer', 'Frattesi', 'De Vrij', 'Darmian'],
}

export const TEAMS = Object.keys(TEAMS_AND_PLAYERS).sort()
