from django.core.management.base import BaseCommand
from family.models import FamilyMember


DEMO_TREE = {
    'name_kk': 'Атабек', 'name_ru': 'Атабек', 'gender': 'male',
    'birth_year': 1750, 'death_year': 1830, 'generation': 1,
    'description': 'Отбасының негізін қалаушы, ұлы ата',
    'description_ru': 'Основатель рода, великий предок',
    'children': [
        {
            'name_kk': 'Нұрберген', 'name_ru': 'Нурберген', 'gender': 'male',
            'birth_year': 1780, 'death_year': 1855, 'generation': 2,
            'description': 'Ұлы баласы, батыр',
            'description_ru': 'Старший сын, батыр',
            'children': [
                {
                    'name_kk': 'Бердібек', 'name_ru': 'Бердибек', 'gender': 'male',
                    'birth_year': 1810, 'death_year': 1880, 'generation': 3,
                    'description': 'Ақылды бий, ел басқарған',
                    'description_ru': 'Мудрый бий, управлял родом',
                    'children': [
                        {
                            'name_kk': 'Оразалы', 'name_ru': 'Оразалы', 'gender': 'male',
                            'birth_year': 1840, 'death_year': 1915, 'generation': 4,
                            'children': [
                                {
                                    'name_kk': 'Айтбай', 'name_ru': 'Айтбай', 'gender': 'male',
                                    'birth_year': 1870, 'death_year': 1945, 'generation': 5,
                                    'children': [
                                        {
                                            'name_kk': 'Серік', 'name_ru': 'Серик', 'gender': 'male',
                                            'birth_year': 1905, 'death_year': 1975, 'generation': 6,
                                            'children': [
                                                {'name_kk': 'Дәулет', 'name_ru': 'Даулет', 'gender': 'male', 'birth_year': 1940, 'death_year': 2010, 'generation': 7},
                                                {'name_kk': 'Гүлнар', 'name_ru': 'Гульнар', 'gender': 'female', 'birth_year': 1943, 'death_year': 2015, 'generation': 7},
                                            ],
                                        },
                                        {
                                            'name_kk': 'Марат', 'name_ru': 'Марат', 'gender': 'male',
                                            'birth_year': 1910, 'death_year': 1943, 'generation': 6,
                                            'description': 'Ұлы Отан соғысында қаза тапқан',
                                            'description_ru': 'Погиб в Великой Отечественной войне',
                                            'children': [
                                                {'name_kk': 'Қанат', 'name_ru': 'Канат', 'gender': 'male', 'birth_year': 1938, 'death_year': 2005, 'generation': 7},
                                            ],
                                        },
                                    ],
                                },
                                {
                                    'name_kk': 'Тұрсын', 'name_ru': 'Турсын', 'gender': 'male',
                                    'birth_year': 1875, 'death_year': 1950, 'generation': 5,
                                    'children': [
                                        {
                                            'name_kk': 'Алмас', 'name_ru': 'Алмас', 'gender': 'male',
                                            'birth_year': 1908, 'death_year': 1980, 'generation': 6,
                                            'children': [
                                                {'name_kk': 'Ербол', 'name_ru': 'Ербол', 'gender': 'male', 'birth_year': 1942, 'death_year': 2018, 'generation': 7},
                                                {'name_kk': 'Айнұр', 'name_ru': 'Айнур', 'gender': 'female', 'birth_year': 1945, 'generation': 7},
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            'name_kk': 'Жанат', 'name_ru': 'Жанат', 'gender': 'male',
                            'birth_year': 1845, 'death_year': 1920, 'generation': 4,
                            'children': [
                                {
                                    'name_kk': 'Бақыт', 'name_ru': 'Бакыт', 'gender': 'male',
                                    'birth_year': 1878, 'death_year': 1955, 'generation': 5,
                                    'children': [
                                        {
                                            'name_kk': 'Нұрлан', 'name_ru': 'Нурлан', 'gender': 'male',
                                            'birth_year': 1912, 'death_year': 1985, 'generation': 6,
                                            'children': [
                                                {'name_kk': 'Әсел', 'name_ru': 'Асель', 'gender': 'female', 'birth_year': 1945, 'death_year': 2020, 'generation': 7},
                                                {'name_kk': 'Берік', 'name_ru': 'Берик', 'gender': 'male', 'birth_year': 1948, 'generation': 7},
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    'name_kk': 'Молдаш', 'name_ru': 'Молдаш', 'gender': 'male',
                    'birth_year': 1815, 'death_year': 1890, 'generation': 3,
                    'children': [
                        {
                            'name_kk': 'Сәрсен', 'name_ru': 'Сарсен', 'gender': 'male',
                            'birth_year': 1848, 'death_year': 1925, 'generation': 4,
                            'children': [
                                {
                                    'name_kk': 'Жәнібек', 'name_ru': 'Жанибек', 'gender': 'male',
                                    'birth_year': 1880, 'death_year': 1960, 'generation': 5,
                                    'children': [
                                        {
                                            'name_kk': 'Еркін', 'name_ru': 'Еркин', 'gender': 'male',
                                            'birth_year': 1915, 'death_year': 1990, 'generation': 6,
                                            'children': [
                                                {'name_kk': 'Арман', 'name_ru': 'Арман', 'gender': 'male', 'birth_year': 1950, 'generation': 7},
                                                {'name_kk': 'Динара', 'name_ru': 'Динара', 'gender': 'female', 'birth_year': 1953, 'generation': 7},
                                            ],
                                        },
                                        {'name_kk': 'Сапаргүл', 'name_ru': 'Сапаргуль', 'gender': 'female', 'birth_year': 1918, 'death_year': 2000, 'generation': 6},
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            'name_kk': 'Төребек', 'name_ru': 'Торебек', 'gender': 'male',
            'birth_year': 1785, 'death_year': 1860, 'generation': 2,
            'description': 'Екінші ұлы, мал шаруашылығымен айналысқан',
            'description_ru': 'Второй сын, занимался скотоводством',
            'children': [
                {
                    'name_kk': 'Қуаныш', 'name_ru': 'Куаныш', 'gender': 'male',
                    'birth_year': 1818, 'death_year': 1895, 'generation': 3,
                    'children': [
                        {
                            'name_kk': 'Болат', 'name_ru': 'Болат', 'gender': 'male',
                            'birth_year': 1850, 'death_year': 1930, 'generation': 4,
                            'children': [
                                {
                                    'name_kk': 'Есбол', 'name_ru': 'Есбол', 'gender': 'male',
                                    'birth_year': 1882, 'death_year': 1965, 'generation': 5,
                                    'children': [
                                        {
                                            'name_kk': 'Талғат', 'name_ru': 'Талгат', 'gender': 'male',
                                            'birth_year': 1920, 'death_year': 1995, 'generation': 6,
                                            'children': [
                                                {'name_kk': 'Руслан', 'name_ru': 'Руслан', 'gender': 'male', 'birth_year': 1955, 'generation': 7},
                                                {'name_kk': 'Зарина', 'name_ru': 'Зарина', 'gender': 'female', 'birth_year': 1958, 'generation': 7},
                                                {'name_kk': 'Тимур', 'name_ru': 'Тимур', 'gender': 'male', 'birth_year': 1961, 'generation': 7},
                                            ],
                                        },
                                    ],
                                },
                                {'name_kk': 'Гүлбаршын', 'name_ru': 'Гульбаршин', 'gender': 'female', 'birth_year': 1885, 'death_year': 1970, 'generation': 5},
                            ],
                        },
                        {
                            'name_kk': 'Амангелді', 'name_ru': 'Амангельды', 'gender': 'male',
                            'birth_year': 1855, 'death_year': 1935, 'generation': 4,
                            'children': [
                                {
                                    'name_kk': 'Қайрат', 'name_ru': 'Кайрат', 'gender': 'male',
                                    'birth_year': 1888, 'death_year': 1968, 'generation': 5,
                                    'children': [
                                        {
                                            'name_kk': 'Дулат', 'name_ru': 'Дулат', 'gender': 'male',
                                            'birth_year': 1922, 'death_year': 2000, 'generation': 6,
                                            'children': [
                                                {'name_kk': 'Айбек', 'name_ru': 'Айбек', 'gender': 'male', 'birth_year': 1956, 'generation': 7},
                                                {'name_kk': 'Мадина', 'name_ru': 'Мадина', 'gender': 'female', 'birth_year': 1960, 'generation': 7},
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {'name_kk': 'Айжан', 'name_ru': 'Айжан', 'gender': 'female', 'birth_year': 1820, 'death_year': 1900, 'generation': 3, 'description': 'Қызы, мектеп ашқан', 'description_ru': 'Дочь, открыла школу'},
            ],
        },
        {
            'name_kk': 'Қалдыбай', 'name_ru': 'Калдыбай', 'gender': 'male',
            'birth_year': 1790, 'death_year': 1865, 'generation': 2,
            'description': 'Кенже ұлы, саудагер',
            'description_ru': 'Младший сын, торговец',
            'children': [
                {
                    'name_kk': 'Ыбырай', 'name_ru': 'Ибрай', 'gender': 'male',
                    'birth_year': 1825, 'death_year': 1905, 'generation': 3,
                    'children': [
                        {
                            'name_kk': 'Асан', 'name_ru': 'Асан', 'gender': 'male',
                            'birth_year': 1858, 'death_year': 1938, 'generation': 4,
                            'children': [
                                {
                                    'name_kk': 'Мұхтар', 'name_ru': 'Мухтар', 'gender': 'male',
                                    'birth_year': 1890, 'death_year': 1970, 'generation': 5,
                                    'children': [
                                        {
                                            'name_kk': 'Самат', 'name_ru': 'Самат', 'gender': 'male',
                                            'birth_year': 1925, 'death_year': 2005, 'generation': 6,
                                            'children': [
                                                {'name_kk': 'Асхат', 'name_ru': 'Асхат', 'gender': 'male', 'birth_year': 1960, 'generation': 7},
                                                {'name_kk': 'Сәуле', 'name_ru': 'Сауле', 'gender': 'female', 'birth_year': 1963, 'generation': 7},
                                            ],
                                        },
                                        {'name_kk': 'Раушан', 'name_ru': 'Раушан', 'gender': 'female', 'birth_year': 1928, 'death_year': 2010, 'generation': 6},
                                    ],
                                },
                            ],
                        },
                        {
                            'name_kk': 'Үсен', 'name_ru': 'Усен', 'gender': 'male',
                            'birth_year': 1860, 'death_year': 1940, 'generation': 4,
                            'children': [
                                {
                                    'name_kk': 'Бақберген', 'name_ru': 'Бакберген', 'gender': 'male',
                                    'birth_year': 1895, 'death_year': 1975, 'generation': 5,
                                    'children': [
                                        {
                                            'name_kk': 'Дархан', 'name_ru': 'Дархан', 'gender': 'male',
                                            'birth_year': 1930, 'death_year': 2008, 'generation': 6,
                                            'children': [
                                                {'name_kk': 'Нұржан', 'name_ru': 'Нуржан', 'gender': 'male', 'birth_year': 1965, 'generation': 7},
                                                {'name_kk': 'Алтынай', 'name_ru': 'Алтынай', 'gender': 'female', 'birth_year': 1968, 'generation': 7},
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
}


def create_member(data, parent=None, order=0):
    children_data = data.pop('children', [])
    member = FamilyMember.objects.create(parent=parent, order=order, **data)
    for i, child_data in enumerate(children_data):
        create_member(dict(child_data), parent=member, order=i)
    return member


class Command(BaseCommand):
    help = 'Seed demo family tree data'

    def handle(self, *args, **options):
        if FamilyMember.objects.exists():
            self.stdout.write(self.style.WARNING('Data already exists. Use --force to reseed.'))
            if '--force' not in args and not options.get('force'):
                return
            FamilyMember.objects.all().delete()
            self.stdout.write('Cleared existing data.')

        create_member(dict(DEMO_TREE))
        total = FamilyMember.objects.count()
        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {total} family members.'))

    def add_arguments(self, parser):
        parser.add_argument('--force', action='store_true', help='Force reseed (deletes existing data)')
