import type { FamilyMember } from '../types/family';

export const DEMO_DATA: FamilyMember = {
  id: 'atabek',
  nameKk: 'Атабек',
  nameRu: 'Атабек',
  gender: 'male',
  description: 'Отбасының негізін қалаушы, ұлы ата',
  descriptionRu: 'Основатель рода, великий предок',
  generation: 1,
  children: [
    {
      id: 'nurbergen',
      nameKk: 'Нұрберген',
      nameRu: 'Нурберген',
      gender: 'male',
      description: 'Ұлы баласы, батыр',
      descriptionRu: 'Старший сын, батыр',
      generation: 2,
      children: [
        {
          id: 'berdibek',
          nameKk: 'Бердібек',
          nameRu: 'Бердибек',
          gender: 'male',
          description: 'Ақылды бий, ел басқарған',
          descriptionRu: 'Мудрый бий, управлял родом',
          generation: 3,
          children: [
            {
              id: 'orazaly',
              nameKk: 'Оразалы',
              nameRu: 'Оразалы',
              gender: 'male',
              generation: 4,
              children: [
                {
                  id: 'aitbay',
                  nameKk: 'Айтбай',
                  nameRu: 'Айтбай',
                  gender: 'male',
                  generation: 5,
                  children: [
                    {
                      id: 'serik',
                      nameKk: 'Серік',
                      nameRu: 'Серик',
                      gender: 'male',
                      generation: 6,
                      children: [
                        { id: 'daulet', nameKk: 'Дәулет', nameRu: 'Даулет', gender: 'male', generation: 7 },
                        { id: 'gulnar', nameKk: 'Гүлнар', nameRu: 'Гульнар', gender: 'female', generation: 7 },
                      ],
                    },
                    {
                      id: 'marat',
                      nameKk: 'Марат',
                      nameRu: 'Марат',
                      gender: 'male',
                      description: 'Ұлы Отан соғысында қаза тапқан',
                      descriptionRu: 'Погиб в Великой Отечественной войне',
                      generation: 6,
                      children: [
                        { id: 'kanat', nameKk: 'Қанат', nameRu: 'Канат', gender: 'male', generation: 7 },
                      ],
                    },
                  ],
                },
                {
                  id: 'tursyn',
                  nameKk: 'Тұрсын',
                  nameRu: 'Турсын',
                  gender: 'male',
                  generation: 5,
                  children: [
                    {
                      id: 'almas',
                      nameKk: 'Алмас',
                      nameRu: 'Алмас',
                      gender: 'male',
                      generation: 6,
                      children: [
                        { id: 'erbol', nameKk: 'Ербол', nameRu: 'Ербол', gender: 'male', generation: 7 },
                        { id: 'ainur', nameKk: 'Айнұр', nameRu: 'Айнур', gender: 'female', generation: 7 },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'zhanat',
              nameKk: 'Жанат',
              nameRu: 'Жанат',
              gender: 'male',
              generation: 4,
              children: [
                {
                  id: 'baqyt',
                  nameKk: 'Бақыт',
                  nameRu: 'Бакыт',
                  gender: 'male',
                  generation: 5,
                  children: [
                    {
                      id: 'nurlan',
                      nameKk: 'Нұрлан',
                      nameRu: 'Нурлан',
                      gender: 'male',
                      generation: 6,
                      children: [
                        { id: 'asel', nameKk: 'Әсел', nameRu: 'Асель', gender: 'female', generation: 7 },
                        { id: 'berik', nameKk: 'Берік', nameRu: 'Берик', gender: 'male', generation: 7 },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'moldash',
          nameKk: 'Молдаш',
          nameRu: 'Молдаш',
          gender: 'male',
          generation: 3,
          children: [
            {
              id: 'sarsen',
              nameKk: 'Сәрсен',
              nameRu: 'Сарсен',
              gender: 'male',
              generation: 4,
              children: [
                {
                  id: 'zhanibek',
                  nameKk: 'Жәнібек',
                  nameRu: 'Жанибек',
                  gender: 'male',
                  generation: 5,
                  children: [
                    {
                      id: 'yerkin',
                      nameKk: 'Еркін',
                      nameRu: 'Еркин',
                      gender: 'male',
                      generation: 6,
                      children: [
                        { id: 'arman', nameKk: 'Арман', nameRu: 'Арман', gender: 'male', generation: 7 },
                        { id: 'dinara', nameKk: 'Динара', nameRu: 'Динара', gender: 'female', generation: 7 },
                      ],
                    },
                    {
                      id: 'sapargul',
                      nameKk: 'Сапаргүл',
                      nameRu: 'Сапаргуль',
                      gender: 'female',
                      generation: 6,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'torebek',
      nameKk: 'Төребек',
      nameRu: 'Торебек',
      gender: 'male',
      description: 'Екінші ұлы, мал шаруашылығымен айналысқан',
      descriptionRu: 'Второй сын, занимался скотоводством',
      generation: 2,
      children: [
        {
          id: 'kuanysh',
          nameKk: 'Қуаныш',
          nameRu: 'Куаныш',
          gender: 'male',
          generation: 3,
          children: [
            {
              id: 'bolat',
              nameKk: 'Болат',
              nameRu: 'Болат',
              gender: 'male',
              generation: 4,
              children: [
                {
                  id: 'yesbol',
                  nameKk: 'Есбол',
                  nameRu: 'Есбол',
                  gender: 'male',
                  generation: 5,
                  children: [
                    {
                      id: 'talgat',
                      nameKk: 'Талғат',
                      nameRu: 'Талгат',
                      gender: 'male',
                      generation: 6,
                      children: [
                        { id: 'ruslan', nameKk: 'Руслан', nameRu: 'Руслан', gender: 'male', generation: 7 },
                        { id: 'zarina', nameKk: 'Зарина', nameRu: 'Зарина', gender: 'female', generation: 7 },
                        { id: 'timur', nameKk: 'Тимур', nameRu: 'Тимур', gender: 'male', generation: 7 },
                      ],
                    },
                  ],
                },
                {
                  id: 'gulbarshin',
                  nameKk: 'Гүлбаршын',
                  nameRu: 'Гульбаршин',
                  gender: 'female',
                  generation: 5,
                },
              ],
            },
            {
              id: 'amangeldi',
              nameKk: 'Амангелді',
              nameRu: 'Амангельды',
              gender: 'male',
              generation: 4,
              children: [
                {
                  id: 'qairat',
                  nameKk: 'Қайрат',
                  nameRu: 'Кайрат',
                  gender: 'male',
                  generation: 5,
                  children: [
                    {
                      id: 'dulat',
                      nameKk: 'Дулат',
                      nameRu: 'Дулат',
                      gender: 'male',
                      generation: 6,
                      children: [
                        { id: 'aibek', nameKk: 'Айбек', nameRu: 'Айбек', gender: 'male', generation: 7 },
                        { id: 'madina', nameKk: 'Мадина', nameRu: 'Мадина', gender: 'female', generation: 7 },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'ayzhan',
          nameKk: 'Айжан',
          nameRu: 'Айжан',
          gender: 'female',
          description: 'Қызы, мектеп ашқан',
          descriptionRu: 'Дочь, открыла школу',
          generation: 3,
        },
      ],
    },
    {
      id: 'qaldybay',
      nameKk: 'Қалдыбай',
      nameRu: 'Калдыбай',
      gender: 'male',
      description: 'Кенже ұлы, саудагер',
      descriptionRu: 'Младший сын, торговец',
      generation: 2,
      children: [
        {
          id: 'ybyraj',
          nameKk: 'Ыбырай',
          nameRu: 'Ибрай',
          gender: 'male',
          generation: 3,
          children: [
            {
              id: 'asan',
              nameKk: 'Асан',
              nameRu: 'Асан',
              gender: 'male',
              generation: 4,
              children: [
                {
                  id: 'mukhtar',
                  nameKk: 'Мұхтар',
                  nameRu: 'Мухтар',
                  gender: 'male',
                  generation: 5,
                  children: [
                    {
                      id: 'samat',
                      nameKk: 'Самат',
                      nameRu: 'Самат',
                      gender: 'male',
                      generation: 6,
                      children: [
                        { id: 'askhat', nameKk: 'Асхат', nameRu: 'Асхат', gender: 'male', generation: 7 },
                        { id: 'saule', nameKk: 'Сәуле', nameRu: 'Сауле', gender: 'female', generation: 7 },
                      ],
                    },
                    {
                      id: 'raushan',
                      nameKk: 'Раушан',
                      nameRu: 'Раушан',
                      gender: 'female',
                      generation: 6,
                    },
                  ],
                },
              ],
            },
            {
              id: 'usen',
              nameKk: 'Үсен',
              nameRu: 'Усен',
              gender: 'male',
              generation: 4,
              children: [
                {
                  id: 'baqbergen',
                  nameKk: 'Бақберген',
                  nameRu: 'Бакберген',
                  gender: 'male',
                  generation: 5,
                  children: [
                    {
                      id: 'darkhan',
                      nameKk: 'Дархан',
                      nameRu: 'Дархан',
                      gender: 'male',
                      generation: 6,
                      children: [
                        { id: 'nurzhan', nameKk: 'Нұржан', nameRu: 'Нуржан', gender: 'male', generation: 7 },
                        { id: 'altynay', nameKk: 'Алтынай', nameRu: 'Алтынай', gender: 'female', generation: 7 },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
