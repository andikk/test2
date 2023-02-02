(function ($) {


    const show = function(ds) {
      let nodeTemplate = function (data) {
        let personContent = "";

        personContent = '<a href="' + data.url + '">' + data.title + "</a>";
        if (data.url === "") {
          personContent = data.title;
        }

        let departmentContent = "";

        departmentContent = '<a href="' + data.depUrl + '">' + data.name + "</a>";
        if (data.depUrl === "") {
          departmentContent = data.name;
        }

        return (
          '<div class="title">' +
          departmentContent.replace(/&lt;br&gt;/g, '<br/>') +
          '</div><div class="content">' +
          personContent.replace(/&lt;br&gt;/g, '<br/>') +
          "</div>"
        );
      };

      let oc = $("#chart-container").orgchart({
        data: ds,
        nodeContent: "title",
        verticalLevel: 3,
        visibleLevel: 3,
        nodeTemplate: nodeTemplate,
        createNode: function ($node, data) {
          if (data.name === "Ректор") {
            let assistantNode =
              '<div class="assistant-node"><div class="connector"/><div class="title title--assistant">Ученый совет <br>Ученый секретарь</div><div class="content"><a href="http://www.ncfu.ru/for-employee/list-of-employees/employee/2881537b-1e28-11e9-bd69-0050568c7ce8/">Покотилова Татьяна Евгеньевна</a></div><i class="edge verticalEdge bottomEdge fa"></i></div>';
            $node.append(assistantNode);
          }

          if (data.name === "Ректор") {
            let assistantNode1 =
              '<div class="assistant-node1"><div class="connector1"/><div class="title">Наблюдательный совет <br>Председатель</div><div class="content"><a href="https://www.gubernator.stavkray.ru/">Владимиров Владимир Владимирович</div><i class="edge verticalEdge bottomEdge fa"></i></div>';
            $node.append(assistantNode1);
          }
        },
      });
    }

    // запросили данные
    fetch('https://webadm.ncfu.ru/api/structure/')
      .then(response => response.json())
      .then(data => {

        const formatChildren = (rows) => {
          return Object.entries(rows).map(([, value]) => {
            return {
              ...value,
              children: value.children ? formatChildren(value.children) : []
            }
          }).sort(function (a, b) {
            return a.sort - b.sort;
          });
        }

        let dataForChart = formatChildren(data)[0];
     //   console.log(dataForChart);
     //    dataForChart = {
     //      "name": "Ректор",
     //      "title": "Беспалов Дмитрий Николаевич",
     //      "depUrl": "",
     //      "url": "http://www.ncfu.ru/university/sostav-rektorata-severo-kavkazskogo-federalnogo-universiteta/bespalov-dmitrij-nikolaevich/",
     //      "className": "rec",
     //      "sort": "500",
     //      "children": [
     //        {
     //          "name": "Филиалы",
     //          "title": "",
     //          "depUrl": "",
     //          "url": "",
     //          "className": " full",
     //          "sort": "1",
     //          "children": [
     //            {
     //              "name": "Пятигорский &lt;br&gt; институт (филиал) СКФУ",
     //              "title": "Шебзухова Татьяна Александровна",
     //              "depUrl": "https://www.ncfu.ru/NCFU_PYATIGORSK/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Невинномысский технологический институт (филиал) СКФУ",
     //              "title": "Ефанов Алексей Валерьевич",
     //              "depUrl": "http://nti.ncfu.ru",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            }
     //          ],
     //          "relationship": "111",
     //          "level": 2
     //        },
     //        {
     //          "name": "Институты",
     //          "title": "",
     //          "depUrl": "",
     //          "url": "",
     //          "className": " full",
     //          "sort": "2",
     //          "children": [
     //            {
     //              "name": "Гуманитарный институт",
     //              "title": "Колесникова Марина Евгеньевна",
     //              "depUrl": "https://gi.ncfu.ru/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "МНИЛ Центр Закавказских исследований",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "МНИЛ по изучению стран Ближнего Востока",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Инженерный институт",
     //              "title": "Кононов Юрий Григорьевич",
     //              "depUrl": "https://ii.ncfu.ru",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Институт цифрового развития",
     //              "title": "Петренко Вячеслав Иванович",
     //              "depUrl": "http://www.ncfu.ru/university/institutes/institut-informacionnyh-tehnologiy-i-telekommunikaciy/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Институт экономики и управления",
     //              "title": "Ушвицкий Лев Исакович",
     //              "depUrl": "https://econom.ncfu.ru",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Юридический институт",
     //              "title": "Смирнов Дмитрий Анатольевич",
     //              "depUrl": "https://ui.ncfu.ru",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Институт наук о Земле",
     //              "title": "Белозеров Виталий Семенович",
     //              "depUrl": "https://inoz.ncfu.ru",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Геологический музей",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [
     //                    {
     //                      "name": "Отдел общей и исторической геологии",
     //                      "title": "",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 5
     //                    },
     //                    {
     //                      "name": "Отдел региональной геологии",
     //                      "title": "",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 5
     //                    },
     //                    {
     //                      "name": "Отдел палеонтологии",
     //                      "title": "",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 5
     //                    }
     //                  ],
     //                  "relationship": "101",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            }
     //          ],
     //          "relationship": "111",
     //          "level": 2
     //        },
     //        {
     //          "name": "Факультеты",
     //          "title": "",
     //          "depUrl": "",
     //          "url": "",
     //          "className": " full",
     //          "sort": "3",
     //          "children": [
     //            {
     //              "name": "Факультет математики и компьютерных наук имени профессора Н.И. Червякова",
     //              "title": "",
     //              "depUrl": "https://www.ncfu.ru/university/institutes/Fakul_tet-matematiki-i-komp_uternyh-nauk-imeni-professora-N.I.-Chervyakova",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Региональный научно-образовательный математический центр «Северо-Кавказский центр математических исследований» ",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "100",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Физико-технический факультет",
     //              "title": "Волкова Валентина Ивановна",
     //              "depUrl": "https://ftf.ncfu.ru",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Химико-фармацевтический факультет",
     //              "title": "Аксёнов Александр Викторович",
     //              "depUrl": "https://hff.ncfu.ru",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Психолого-педагогический факультет",
     //              "title": "Палиева Надежда Андреевна",
     //              "depUrl": "https://www.ncfu.ru/university/institutes/Psihologo-pedagogicheskii-fakul_tet/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Психологическая клиника",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "100",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Факультет пищевой инженерии и биотехнологий",
     //              "title": "Оботурова Наталья Павловна",
     //              "depUrl": "https://www.ncfu.ru/university/institutes/Fakul_tet-pievoi-injenerii-i-biotehnologii/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Служба общественного питания",
     //                  "title": "Михайлова Валентина Николаевна",
     //                  "depUrl": "http://www.ncfu.ru/for-employee/departments/sluzhba-obshchestvennogo-pitaniya/",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Междисциплинарный учебно-научный центр агротехнологий",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Факультет физической культуры и спорта",
     //              "title": "Смышнов Константин Михайлович",
     //              "depUrl": "https://www.ncfu.ru/university/institutes/Fakul_tet-fizicheskoi-kul_tury-i-sporta/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Медико-биологический факультет",
     //              "title": "Кубанов Сергей Исмаилович",
     //              "depUrl": "https://www.ncfu.ru/university/institutes/Mediko-biologicheskii-fakul_tet",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            }
     //          ],
     //          "relationship": "111",
     //          "level": 2
     //        },
     //        {
     //          "name": "Первый проректор",
     //          "title": "Лиховид Андрей Александрович",
     //          "depUrl": "",
     //          "url": "https://www.ncfu.ru/university/sostav-rektorata-severo-kavkazskogo-federalnogo-universiteta/lihovid-andreyi-aleksandrovich/",
     //          "className": "",
     //          "sort": "4",
     //          "children": [
     //            {
     //              "name": "Музейный центр СКФУ",
     //              "title": "Сорокина Анна Юрьевна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/Departament-nauki-i-tehnologii/muzeynyy-centr/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Научная библиотека",
     //              "title": "Кыдрева Светлана Геннадьевна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/library/index.html",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Информационно-библиотечный центр",
     //                  "title": "Боховко Оксана Ивановна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "100",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Медицинский центр",
     //              "title": "Кубанов Сергей Исмаилович",
     //              "depUrl": "http://www.ncfu.ru/for-employee/departments/medicinskiy-centr/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Медицинский пункт объекта спорта",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": " full",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "100",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            }
     //          ],
     //          "relationship": "111",
     //          "level": 2
     //        },
     //        {
     //          "name": "Проректор по научной и исследовательской работе",
     //          "title": "Алиханов Анатолий Алиевич",
     //          "depUrl": "",
     //          "url": "",
     //          "className": "",
     //          "sort": "5",
     //          "children": [
     //            {
     //              "name": "Департамент науки и технологий",
     //              "title": "Трофимов Максим Сергеевич",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/Departament-nauki-i-tehnologii/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Центр перспективных исследований и разработок",
     //                  "title": "Гандрабурова Надежда Ивановна",
     //                  "depUrl": "http://www.ncfu.ru/for-employee/departments/upravlenie-nauki-i-tehnologii/centr-perspektivnyh-issledovaniy-i-razrabotok/",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Центр развития публикационной активности и патентно-лицензионной работы",
     //                  "title": "Кучуков Виктор Андреевич",
     //                  "depUrl": "https://www.ncfu.ru/for-employee/departments/Departament-nauki-i-tehnologii/centr-razvitiya-publikacionnoy-aktivnosti-i-patentno-licenzionnoy-raboty/index.html",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Центр научных грантов и программ",
     //                  "title": "Безгуб Анжелика Сергеевна",
     //                  "depUrl": "https://www.ncfu.ru/for-employee/departments/Departament-nauki-i-tehnologii/centr-nauchnyh-grantov-i-programm/index.html",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Редакционно-издательский отдел",
     //                  "title": "Толмачев Михаил Иванович",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Управление развития наукоемкого сервиса",
     //              "title": "Апанасенко Анна Евгеньевна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/Upravlenie-razvitiya-naukoemkogo-servisa",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Центр инжиниринговых и консалтинговых услуг",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "НОЦ судебной экспертизы и экспертных исследований",
     //                  "title": "Апанасенко Анна Евгеньевна",
     //                  "depUrl": "https://www.ncfu.ru/for-employee/departments/nocseei/",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Школа перспективных междисциплинарных исследований и разработок",
     //              "title": "Демидов Олег Петрович",
     //              "depUrl": "",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Управление подготовки и аттестации кадров высшей квалификации",
     //              "title": "Кузнецова Оксана Николаевна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/Upravlenie-podgotovki-i-attestacii-kadrov-vysei-kvalifikacii/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Отдел аспирантуры и докторантуры",
     //                  "title": "Гусева Екатерина Анатольевна",
     //                  "depUrl": "https://www.ncfu.ru/for-employee/departments/Upravlenie-podgotovki-i-attestacii-kadrov-vysei-kvalifikacii/otdel-aspirantury/",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел аттестации научных и научно-педагогических работников",
     //                  "title": "Волчкова Анастасия Сергеевна",
     //                  "depUrl": "https://www.ncfu.ru/for-employee/departments/Upravlenie-podgotovki-i-attestacii-kadrov-vysei-kvalifikacii/Otdel-attestacii-nauchnyh-i-nauchno-pedagogicheskih-rabotnikov/",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            }
     //          ],
     //          "relationship": "111",
     //          "level": 2
     //        },
     //        {
     //          "name": "Проректор по молодежной политике",
     //          "title": "Сонина Елена Владимировна",
     //          "depUrl": "",
     //          "url": "",
     //          "className": "",
     //          "sort": "6",
     //          "children": [
     //            {
     //              "name": "Управление воспитательной работы",
     //              "title": "Власенко Элеонора Робертовна",
     //              "depUrl": "http://www.ncfu.ru/for-employee/departments/upravlenie-vospitatelnoy-raboty/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Отдел культурно-эстетического воспитания",
     //                  "title": "Ливенская Елена Владимировна",
     //                  "depUrl": "http://www.ncfu.ru/for-employee/departments/upravlenie-vospitatelnoy-raboty/otdel-kulturno-esteticheskogo-vospitaniya",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [
     //                    {
     //                      "name": "Костюмерная",
     //                      "title": "Федоренко Оксана Васильевна",
     //                      "depUrl": "http://www.ncfu.ru/for-employee/departments/kostyumernaya/",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "100",
     //                      "level": 5
     //                    }
     //                  ],
     //                  "relationship": "111",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел гражданско-патриотического воспитания",
     //                  "title": "Овчарова Елена Сергеевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел физкультурно-спортивной работы",
     //                  "title": "Денисов Михаил Викторович",
     //                  "depUrl": "http://www.ncfu.ru/for-employee/departments/upravlenie-vospitatelnoy-raboty/otdel-fizkulturno-sportivnoy-raboty/",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [
     //                    {
     //                      "name": "Спортивно-оздоровительный комплекс",
     //                      "title": "Бавтрюков Иван Алексеевич",
     //                      "depUrl": "https://www.ncfu.ru/for-employee/departments/sportivno-ozdorovitelnyy-kompleks/index.html",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 5
     //                    },
     //                    {
     //                      "name": "Студенческий спортивный клуб",
     //                      "title": "",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 5
     //                    },
     //                    {
     //                      "name": "Координационно-методический центр по развитию студенческих спортивных лиг СКФО",
     //                      "title": "",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 5
     //                    }
     //                  ],
     //                  "relationship": "111",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Центр креативных проектов",
     //                  "title": "Шахназарян Александр Габриелович",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел социальной работы",
     //                  "title": "Стасенко Оксана Викторовна",
     //                  "depUrl": "http://www.ncfu.ru/for-employee/departments/upravlenie-vospitatelnoy-raboty/otdel-socialnoy-raboty",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Управление по развитию студенческого потенциала",
     //              "title": "Сонина Елена Владимировна",
     //              "depUrl": "http://www.ncfu.ru/for-employee/departments/upravlenie-po-razvitiyu-stud-potenciala/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Центр развития карьеры и молодежного предпринимательства",
     //                  "title": "Бондарев Дмитрий Михайлович",
     //                  "depUrl": "https://www.ncfu.ru/for-employee/departments/upravlenie-po-razvitiyu-stud-potenciala/centr-razvitiya-karery/",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Центр оценки компетенций обучающихся",
     //                  "title": "Редькина Екатерина Александровна",
     //                  "depUrl": "https://www.ncfu.ru/for-employee/departments/upravlenie-vospitatelnoy-raboty/otdel-grajdansko-patrioticheskogo-vospitaniya/centr-neformalnogo-obrazovaniya/index.html",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Центр молодежного проектирования",
     //                  "title": "Дерновая Алёна Олеговна",
     //                  "depUrl": "https://www.ncfu.ru/for-employee/departments/upravlenie-po-razvitiyu-stud-potenciala/Centr-molodejnogo-proektirovaniya/index.html",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Центр реализации партнерских проектов и кадровых программ молодежи",
     //                  "title": "Баранова Любовь Аркадьевна",
     //                  "depUrl": "https://www.ncfu.ru/for-employee/departments/upravlenie-po-razvitiyu-stud-potenciala/Centr-realizacii-partnerskih-proektov-i-kadrovyh-programmmolodeji/",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Технологический парк",
     //                  "title": "Кузьменко Владимир Викторович",
     //                  "depUrl": "https://www.ncfu.ru/innovations/Tehnologicheskii-park-SKFU",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Центр индивидуальной работы со студентами и студенческими объединениями",
     //              "title": "Гречман Инесса Андреевна",
     //              "depUrl": "http://www.ncfu.ru/for-employee/departments/upravlenie-vospitatelnoy-raboty/otdel-grajdansko-patrioticheskogo-vospitaniya/centr-podderjki-studencheskih-obedinenii/index.html",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Пространство коллективной работы 'Точка кипения'",
     //              "title": "http://www.ncfu.ru/university/tochka-kipeniya/",
     //              "depUrl": "",
     //              "url": "",
     //              "className": " full",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            }
     //          ],
     //          "relationship": "111",
     //          "level": 2
     //        },
     //        {
     //          "name": "Проректор по административной работе",
     //          "title": "Городиская Юлия Николаевна",
     //          "depUrl": "",
     //          "url": "http://www.ncfu.ru/university/sostav-rektorata-severo-kavkazskogo-federalnogo-universiteta/gorodiskaya-uliya-nikolaevna/",
     //          "className": "top-moved",
     //          "sort": "7",
     //          "children": [
     //            {
     //              "name": "Управление делами",
     //              "title": "Логачева Алла Викторовна",
     //              "depUrl": "http://www.ncfu.ru/for-employee/departments/upravleniya-delami/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Архив СКФУ",
     //                  "title": "Петросян Алла Викторовна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "100",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Управление кадрового администрирования",
     //              "title": "Распопова Ольга Николаевна",
     //              "depUrl": "http://www.ncfu.ru/for-employee/departments/upr_kadr_polit/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Отдел по работе с сотрудниками",
     //                  "title": "Горбачева Лилия Сергеевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел по работе со студентами",
     //                  "title": "Якшина Татьяна Александровна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел охраны труда",
     //                  "title": "Комиссарова Лидия Евгеньевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Правовое управление",
     //              "title": "Чаплыгина Инна Алексеевна",
     //              "depUrl": "http://www.ncfu.ru/for-employee/departments/prav_upr/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Центр правового обеспечения основной деятельности",
     //                  "title": "Бабичева Ирина Сергеевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Центр судебной работы",
     //                  "title": "Сидоренко Анжелика Алексеевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Управление планирования и организации закупок",
     //              "title": "Масыч Наталья Викторовна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/upr_zakupok/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Отдел организации конкурсных процедур и сопровождения договоров",
     //                  "title": "Еремина Наталия Леонидовна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел планирования, контроля и технического сопровождения закупок",
     //                  "title": "Шаньгина Анастасия Евгеньевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел материально-технического обеспечения",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Центр развития персонала",
     //              "title": "Кирюхина Людмила Владимировна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/centr-razvitiya-personala/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Служба по земельным отношениям и управлению недвижимым имуществом",
     //              "title": "Жумеф Анна Станиславна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/ouk_zii/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Центр управления рисками",
     //              "title": "Мосензова Ольга Александровна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/Centr-upravleniya-riskami",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            }
     //          ],
     //          "relationship": "111",
     //          "level": 2
     //        },
     //        {
     //          "name": "Проректор по административной работе",
     //          "title": "Городиская Юлия Николаевна",
     //          "depUrl": "",
     //          "url": "http://www.ncfu.ru/university/sostav-rektorata-severo-kavkazskogo-federalnogo-universiteta/gorodiskaya-uliya-nikolaevna/",
     //          "className": "top-hidden",
     //          "sort": "7",
     //          "children": [
     //            {
     //              "name": "Управление делами",
     //              "title": "Логачева Алла Викторовна",
     //              "depUrl": "http://www.ncfu.ru/for-employee/departments/upravleniya-delami/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Архив СКФУ",
     //                  "title": "Петросян Алла Викторовна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "100",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Управление кадрового администрирования",
     //              "title": "Распопова Ольга Николаевна",
     //              "depUrl": "http://www.ncfu.ru/for-employee/departments/upr_kadr_polit/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Отдел по работе с сотрудниками",
     //                  "title": "Горбачева Лилия Сергеевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел по работе со студентами",
     //                  "title": "Якшина Татьяна Александровна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел охраны труда",
     //                  "title": "Комиссарова Лидия Евгеньевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Правовое управление",
     //              "title": "Чаплыгина Инна Алексеевна",
     //              "depUrl": "http://www.ncfu.ru/for-employee/departments/prav_upr/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Центр правового обеспечения основной деятельности",
     //                  "title": "Бабичева Ирина Сергеевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Центр судебной работы",
     //                  "title": "Сидоренко Анжелика Алексеевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Управление планирования и организации закупок",
     //              "title": "Масыч Наталья Викторовна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/upr_zakupok/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Отдел организации конкурсных процедур и сопровождения договоров",
     //                  "title": "Еремина Наталия Леонидовна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел планирования, контроля и технического сопровождения закупок",
     //                  "title": "Шаньгина Анастасия Евгеньевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел материально-технического обеспечения",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Центр развития персонала",
     //              "title": "Кирюхина Людмила Владимировна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/centr-razvitiya-personala/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Служба по земельным отношениям и управлению недвижимым имуществом",
     //              "title": "Жумеф Анна Станиславна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/ouk_zii/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Центр управления рисками",
     //              "title": "Мосензова Ольга Александровна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/Centr-upravleniya-riskami",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            }
     //          ],
     //          "relationship": "111",
     //          "level": 2
     //        },
     //        {
     //          "name": "Проректор по стратегическому и инновационному развитию",
     //          "title": "Авралев Никита Владимирович",
     //          "depUrl": "",
     //          "url": "http://www.ncfu.ru/university/sostav-rektorata-severo-kavkazskogo-federalnogo-universiteta/avralev-nikita-vladimirovich/",
     //          "className": "",
     //          "sort": "8",
     //          "children": [
     //            {
     //              "name": "Управление международного сотрудничества",
     //              "title": "Алиева Людмила Руслановна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/international/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Отдел международного образования",
     //                  "title": "Поволоцкий Александр Викторович",
     //                  "depUrl": "http://www.ncfu.ru/for-employee/departments/international/otdel-mejdunarodnogo-obrazovaniya/",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел международного протокола",
     //                  "title": "Беляев Иван Геннадьевич",
     //                  "depUrl": "http://www.ncfu.ru/for-employee/departments/international/otdel-mejdunarodnogo-protokola/",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел международных проектов и программ",
     //                  "title": "Самойленко Владимир Валерьевич",
     //                  "depUrl": "http://www.ncfu.ru/for-employee/departments/international/omp_i_p/",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел рекрутинга иностранных студентов",
     //                  "title": "Сидоренко Станислав Геннадьевич",
     //                  "depUrl": "https://www.ncfu.ru/for-employee/departments/international/Otdel-rekrutinga-inostrannyh-studentov",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Центр лингвистических экспертиз и тестирования по русскому языку",
     //                  "title": "Лаврик Эльвира Петровна",
     //                  "depUrl": "http://www.ncfu.ru/for-employee/departments/international/centr-lingvisticheskih-akspertiz/",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Подготовительное отделение для иностранных граждан",
     //                  "title": "Кузоятова Ольга Сергеевна",
     //                  "depUrl": "http://www.ncfu.ru/for-employee/departments/international/podgotovitelnoe-otdelenie-dlya-inostrannyh-grazhdan/",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Российско-арабский культурный центр",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Международный российско-узбекский центр",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Издательско-полиграфический комплекс",
     //              "title": "Масалова Светлана Владимировна",
     //              "depUrl": "http://www.ncfu.ru/for-employee/departments/print/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Учебно-производственная рекламно-полиграфическая лаборатория",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Типография",
     //                  "title": "Мельник Владислав Иванович",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Ресурсный центр 3-д моделирования и прототипирования",
     //                  "title": "Ягмуров Михаил Александрович",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Центр мониторинга общественного мнения",
     //              "title": "Рогачев Алексей Александрович",
     //              "depUrl": "",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Департамент развития и маркетинга",
     //              "title": "Зенченко Светлана Вячеславовна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/Departament-razvitiya-i-marketinga/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Центр администрирования отчетов, информационных запросов и аналитики",
     //                  "title": "Ширшова Наталья Владимировна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Центр маркетинговых исследований",
     //                  "title": "Гапич Александр Эрикович",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Центр управления стратегическими проектами (проектный офис)",
     //                  "title": "Глазкова Ирина Юрьевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Северо-Кавказский экспертно-аналитический центр",
     //              "title": "Черкесс Кирилл Андреевич",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/Severo-Kavkazskii-akspertno-analiticheskii-centr/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            }
     //          ],
     //          "relationship": "111",
     //          "level": 2
     //        },
     //        {
     //          "name": "Проректор по образовательной деятельности",
     //          "title": "Иванов Василий Александрович",
     //          "depUrl": "",
     //          "url": "https://www.ncfu.ru/university/sostav-rektorata-severo-kavkazskogo-federalnogo-universiteta/ivanov-vasilii-aleksandrovich/index.html",
     //          "className": "top-moved",
     //          "sort": "9",
     //          "children": [
     //            {
     //              "name": "Управление дополнительного образования и повышения квалификации",
     //              "title": "Федотова Наталья Николаевна",
     //              "depUrl": "http://www.ncfu.ru/for-employee/departments/upravlenie-dopolnitelnogo-obrazovaniya-i-povysheniya-kvalifikacii/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Отдел дополнительного профессионального образования",
     //                  "title": "Высотина Людмила Александровна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел повышения квалификации",
     //                  "title": "Янковец Ирина Анатольевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Управление по работе с абитуриентами",
     //              "title": "Алтыева Инна Степановна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/Upravlenie-po-rabote-s-abiturientami/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Отдел по организации приема",
     //                  "title": "Попова Наталья Владимировна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел профориентации и работы с талантливой молодежью",
     //                  "title": "Алтыева Инна Степановна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Управление довузовской подготовки и профориентации",
     //              "title": "Махринова Марина Владимировна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/Upravlenie-dovuzovskoi-podgotovki-i-inkluzivnogo-obrazovaniya/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Отдел научно-проектной деятельности школьников",
     //                  "title": "Жданова Елена Сергеевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел довузовской подготовки",
     //                  "title": "Плотникова Елена Петровна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Департамент координации среднего профессионального образования",
     //              "title": "Торишный Олег Анатольевич",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/Departament-koordinacii-srednego-professional_nogo-obrazovaniya/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Колледж СКФУ в г.Ставрополе",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "100",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Специализированный учебный научный центр",
     //              "title": "Кондрашова Анастасия Александровна",
     //              "depUrl": "https://www.ncfu.ru/education/Specializirovannyi-uchebnyi-nauchnyi-centr/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //
     //          ],
     //          "relationship": "111",
     //          "level": 2
     //        },
     //        {
     //          "name": "Проректор по образовательной деятельности",
     //          "title": "Иванов Василий Александрович2",
     //          "depUrl": "",
     //          "url": "https://www.ncfu.ru/university/sostav-rektorata-severo-kavkazskogo-federalnogo-universiteta/ivanov-vasilii-aleksandrovich/index.html",
     //          "className": "top-hidden",
     //          "sort": "9",
     //          "children": [
     //            {
     //              "name": "Департамент информационных технологий",
     //              "title": "Барковский Александр Сергеевич",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/departament-inform-tekhnologij",
     //              "url": "",
     //              "className": "second-column",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Отдел развития и сопровождения цифровой корпоративной среды",
     //                  "title": "Лихачёв Сергей Александрович",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [
     //                    {
     //                      "name": "Сектор проектирования сетевой инфраструктуры",
     //                      "title": "Дорохин Сергей Викторович",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 6
     //                    },
     //                    {
     //                      "name": "Сектор информационных сервисов и программного обеспечения",
     //                      "title": "Ильин Вячеслав Владимирович",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 6
     //                    },
     //                    {
     //                      "name": "Сектор инфраструктуры обработки и хранения данных",
     //                      "title": "Иванов Алексей Михайлович",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 6
     //                    },
     //                    {
     //                      "name": "Сектор линейно-кабельной, сетевой инфраструктуры и телекоммуникаций",
     //                      "title": "Нартов Дмитрий Павлович",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 6
     //                    }
     //                  ],
     //                  "relationship": "111",
     //                  "level": 5
     //                },
     //                {
     //                  "name": "Отдел информационной безопасности",
     //                  "title": "Самойленко Игорь Григорьевич",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [
     //                    {
     //                      "name": "Сектор обеспечения защиты информации от несанкционированного доступа",
     //                      "title": "Тимощенко Александр Викторович",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 6
     //                    },
     //                    {
     //                      "name": "Сектор обеспечения функционирования средств криптографической защиты информации и электронной подписи",
     //                      "title": "Дорда Александр Викторович",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 6
     //                    }
     //                  ],
     //                  "relationship": "111",
     //                  "level": 5
     //                },
     //                {
     //                  "name": "Отдел сопровождения и развития интернет-решений",
     //                  "title": "Диканский Андрей Юрьевич",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 5
     //                },
     //                {
     //                  "name": "Отдел сопровождения и развития программных продуктов",
     //                  "title": "Никитенко Александр Владимирович",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 5
     //                },
     //                {
     //                  "name": "Отдел разработки, внедрения информационных систем",
     //                  "title": "Воронкин Владимир Сергеевич",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 5
     //                },
     //                {
     //                  "name": "Центр эксплуатации, обеспечения и учета вычислительной оргтехники",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [
     //                    {
     //                      "name": "Эксплуатационно-технический отдел",
     //                      "title": "Хохлова Елена Анатольевна",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [
     //                        {
     //                          "name": "Сектор эксплуатации ИТ-инфраструктуры учебных корпусов",
     //                          "title": "Герасимов Роман Валерьевич",
     //                          "depUrl": "",
     //                          "url": "",
     //                          "className": "",
     //                          "sort": "500",
     //                          "children": [],
     //                          "relationship": "110",
     //                          "level": 7
     //                        },
     //                        {
     //                          "name": "Сектор эксплуатации компьютерных классов",
     //                          "title": "Ильющенков Дмитрий Сергеевич",
     //                          "depUrl": "",
     //                          "url": "",
     //                          "className": "",
     //                          "sort": "500",
     //                          "children": [],
     //                          "relationship": "110",
     //                          "level": 7
     //                        },
     //                        {
     //                          "name": "Сектор ремонта средств вычислительной и оргтехники",
     //                          "title": "Самойлов Филипп Владимирович",
     //                          "depUrl": "",
     //                          "url": "",
     //                          "className": "",
     //                          "sort": "500",
     //                          "children": [],
     //                          "relationship": "110",
     //                          "level": 7
     //                        },
     //                        {
     //                          "name": "Сектор обслуживания средств мультимедиа",
     //                          "title": "Никифоров Кирилл Владимирович",
     //                          "depUrl": "",
     //                          "url": "",
     //                          "className": "",
     //                          "sort": "500",
     //                          "children": [],
     //                          "relationship": "110",
     //                          "level": 7
     //                        },
     //                        {
     //                          "name": "Сектор учета и материально-технического обеспечения",
     //                          "title": "Удодова Ирина Александровна",
     //                          "depUrl": "",
     //                          "url": "",
     //                          "className": "",
     //                          "sort": "500",
     //                          "children": [],
     //                          "relationship": "110",
     //                          "level": 7
     //                        }
     //                      ],
     //                      "relationship": "101",
     //                      "level": 6
     //                    }
     //                  ],
     //                  "relationship": "111",
     //                  "level": 5
     //                },
     //                {
     //                  "name": "Сектор документооборота",
     //                  "title": "Банько Алеся Васильевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [
     //                    {
     //                      "name": "Диспетчерская",
     //                      "title": "",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": " full",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "100",
     //                      "level": 6
     //                    }
     //                  ],
     //                  "relationship": "111",
     //                  "level": 5
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 4
     //            },
     //            {
     //              "name": "Учебный департамент",
     //              "title": "Черниенко Наталья Руслановна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/Uchebnyi-departament",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Центр планирования и организации учебного процесса",
     //                  "title": "Дубинина Мария Владимировна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [
     //                    {
     //                      "name": "Отдел планирования и сопровождения учебного процесса",
     //                      "title": "Богомолова Светлана Николаевна",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 6
     //                    },
     //                    {
     //                      "name": "Отдел организации учебного процесса",
     //                      "title": "Юринок Елена Анатольевна",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 6
     //                    },
     //                    {
     //                      "name": "Отдел учебно-методического обеспечения образовательных программ",
     //                      "title": "Ложечкина Анна Дмитриевна",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 6
     //                    }
     //                  ],
     //                  "relationship": "111",
     //                  "level": 5
     //                },
     //                {
     //                  "name": "Центр мониторинга качества образования",
     //                  "title": "Бакшева Татьяна Витальевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [
     //                    {
     //                      "name": "Отдел итоговой аттестации",
     //                      "title": "Захарова Татьяна Владимировна",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 6
     //                    },
     //                    {
     //                      "name": "Отдел лицензирования и аккредитации",
     //                      "title": "Батнасунов Александр Сергеевич",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 6
     //                    },
     //                    {
     //                      "name": "Отдел контроля качества обучения и индивидуальных образовательных траекторий",
     //                      "title": "Тонян Диана Аслановна",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 6
     //                    }
     //                  ],
     //                  "relationship": "111",
     //                  "level": 5
     //                },
     //                {
     //                  "name": "Центр цифровой трансформации обучения",
     //                  "title": "Богатырева Валерия Витальевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 5
     //                },
     //                {
     //                  "name": "Центр практической подготовки и внедрения стандартов World Skills",
     //                  "title": "Шаманаева Елена Анатольевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 5
     //                },
     //                {
     //                  "name": "Центр лицензирования, аккредитации и аудита образовательных программ",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 5
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 4
     //            },
     //            {
     //              "name": "Студенческий офис",
     //              "title": "Гордеева Анна Борисовна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/Studencheskii-ofis/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 4
     //            },
     //            {
     //              "name": "Школа креативных индустрий",
     //              "title": "Садыкова Алена Григорьевна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/kola-kreativnyh-industrii/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Кафедра дизайна",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 5
     //                },
     //                {
     //                  "name": "Дизайн-бюро",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [
     //                    {
     //                      "name": "Административный отдел",
     //                      "title": "",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 6
     //                    },
     //                    {
     //                      "name": "Производственный отдел",
     //                      "title": "",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 6
     //                    },
     //                    {
     //                      "name": "Отдел дизайна",
     //                      "title": "",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 6
     //                    }
     //                  ],
     //                  "relationship": "111",
     //                  "level": 5
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 4
     //            },
     //            {
     //              "name": "Ресурсный учебно-методический центр по обучению инвалидов и лиц с ограниченными возможностями здоровья",
     //              "title": "Борозинец Наталья Михайловна",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/rumc/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //          ]
     //        },
     //        {
     //          "name": "Директор по финансовой работе",
     //          "title": "Захарченко Сергей Александрович",
     //          "depUrl": "",
     //          "url": "http://www.ncfu.ru/university/sostav-rektorata-severo-kavkazskogo-federalnogo-universiteta/zaharchenko-sergei-aleksandrovich/",
     //          "className": "",
     //          "sort": "500",
     //          "children": [
     //            {
     //              "name": "Управление планирования, анализа и бухгалтерского учета",
     //              "title": "Жижина Ольга Васильевна",
     //              "depUrl": "http://www.ncfu.ru/for-employee/departments/upravlenie-planirovaniya-analiza-i-buhgalterskogo-ucheta/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Отдел отчетности, анализа и финансового контроля",
     //                  "title": "Воробьева Татьяна Владимировна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел учета и анализа материальных ценностей",
     //                  "title": "Малышенко Алексей Владимирович",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел учета и начисления заработной платы, стипендии и социальных выплат",
     //                  "title": "Сиротина Ирина Михайловна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел планирования и анализа финансово-хозяйственной деятельности",
     //                  "title": "Шадрина Елена Владимировна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел учета и анализа доходов и расходов",
     //                  "title": "Терещенко Виктория Александровна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел планирования и анализа заработной платы, стипендии и социальных выплат",
     //                  "title": "Шкорина Наталья Валерьевна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Фонд управления целевым капиталом (Эндаумент)",
     //              "title": "",
     //              "depUrl": "http://www.ncfu.ru/university/endaumentfond/",
     //              "url": "",
     //              "className": " full",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            }
     //          ],
     //          "relationship": "111",
     //          "level": 2
     //        },
     //        {
     //          "name": "Директор по информационной политике",
     //          "title": "Ахвердиева Мина Исламовна",
     //          "depUrl": "",
     //          "url": "https://www.ncfu.ru/university/sostav-rektorata-severo-kavkazskogo-federalnogo-universiteta/Ahverdieva-Mina-Islamovna/",
     //          "className": "",
     //          "sort": "500",
     //          "children": [
     //            {
     //              "name": "Управление по информации и связям с общественностью",
     //              "title": "Тизенгаузен Максим Георгиевич",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/upravlenie-po-informacii-i-svyazyam-s-obschestvennostyu/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Центр противодействия цифровым угрозам",
     //              "title": "Малькевич Александр Александрович",
     //              "depUrl": "",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            }
     //          ],
     //          "relationship": "111",
     //          "level": 2
     //        },
     //        {
     //          "name": "Директор по эксплуатационно-хозяйственной работе",
     //          "title": "Высотенко Александр Евгеньевич",
     //          "depUrl": "",
     //          "url": "https://www.ncfu.ru/university/sostav-rektorata-severo-kavkazskogo-federalnogo-universiteta/Vysotenko-Aleksandr-Evgen_evich/",
     //          "className": "",
     //          "sort": "500",
     //          "children": [
     //            {
     //              "name": "Служба автотранспортного обеспечения",
     //              "title": "Камбаров Гусейн Гамидович",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/sluzhba-avtotransportnogo-obespecheniya",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Служба главного инженера",
     //              "title": "Зиновьев Александр Вячеславович",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/Slujba-glavnogo-injenera/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Отдел главного механика",
     //                  "title": "Лищенко Александр Владимирович ",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел главного энергетика",
     //                  "title": "Кузьменко Сергей Владимирович",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Служба сервиса и гостеприимства",
     //              "title": "Малев Андрей Александрович",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/Slujba-servisa-i-gostepriimstva/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Центр размещения и регистрации",
     //                  "title": "Праскурина Елена Игоревна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Центр социальной адаптации проживающих",
     //                  "title": "Аветисян Эрнест Камоевич",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Центр инфраструктурного администрирования",
     //                  "title": "Янькова Татьяна Михайловна",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            }
     //          ],
     //          "relationship": "111",
     //          "level": 2
     //        },
     //        {
     //          "name": "Подразделения прямого подчинения",
     //          "title": "",
     //          "depUrl": "",
     //          "url": "",
     //          "className": " full",
     //          "sort": "500",
     //          "children": [
     //            {
     //              "name": "Ректорат",
     //              "title": "",
     //              "depUrl": "",
     //              "url": "",
     //              "className": " full",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Приемная комиссия",
     //              "title": "",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/priemnaya-komissiya/",
     //              "url": "",
     //              "className": " full",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Департамент комплексной безопасности",
     //              "title": "Щербалев Андрей Иванович",
     //              "depUrl": "https://www.ncfu.ru/for-employee/departments/upr_kompl_bezop/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [
     //                {
     //                  "name": "Управление капитального строительства",
     //                  "title": "Новолокин Дмитрий Петрович",
     //                  "depUrl": "http://www.ncfu.ru/for-employee/departments/upravlenie-kapitalnogo-stroitelstva/",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [
     //                    {
     //                      "name": "Отдел строительного контроля и технического сопровождения объектов",
     //                      "title": "",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 5
     //                    },
     //                    {
     //                      "name": "Ремонтно-строительный участок",
     //                      "title": "",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 5
     //                    },
     //                    {
     //                      "name": "Сметный отдел",
     //                      "title": "Морозова Наталья Ивановна",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 5
     //                    },
     //                    {
     //                      "name": "Учебно-производственные мастерские",
     //                      "title": "Мосиенко Сергей Владимирович",
     //                      "depUrl": "",
     //                      "url": "",
     //                      "className": "",
     //                      "sort": "500",
     //                      "children": [],
     //                      "relationship": "110",
     //                      "level": 5
     //                    }
     //                  ],
     //                  "relationship": "111",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел организации контрольно-пропускного режима и безопасности",
     //                  "title": "Скоморощенко Алексей Владимирович",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Сектор пропусков и технического обеспечения",
     //                  "title": "Федосеев Андрей Алексеевич",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Отдел организации профилактической работы, гражданской обороны и готовности к чрезвычайным ситуациям (ООПРГОиЧС)",
     //                  "title": "Ложников Александр Александрович",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                },
     //                {
     //                  "name": "Сектор обеспечения гражданской обороны и готовности к чрезвычайным ситуациям",
     //                  "title": "",
     //                  "depUrl": "",
     //                  "url": "",
     //                  "className": "",
     //                  "sort": "500",
     //                  "children": [],
     //                  "relationship": "110",
     //                  "level": 4
     //                }
     //              ],
     //              "relationship": "111",
     //              "level": 3
     //            },
     //            {
     //              "name": "Мобилизационное управление",
     //              "title": "Носатенко Максим Иванович",
     //              "depUrl": "http://www.ncfu.ru/for-employee/departments/mob-upr/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Отдел по защите государственной тайны",
     //              "title": "Плюхина Виктория Валентиновна",
     //              "depUrl": "http://www.ncfu.ru/for-employee/departments/otdel-po-zaschite-gosudarstvennoy-tayny/",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Военный учебный центр",
     //              "title": "Баштовой Владимир Юрьевич",
     //              "depUrl": "http://www.ncfu.ru/university/institutes/voennyi-uchebnyi-centr/index.html",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            },
     //            {
     //              "name": "Служба внутреннего аудита",
     //              "title": "Михайлова Рузанна Юрьевна",
     //              "depUrl": "http://www.ncfu.ru/for-employee/departments/sluzhba-vnutrennego-audita",
     //              "url": "",
     //              "className": "",
     //              "sort": "500",
     //              "children": [],
     //              "relationship": "110",
     //              "level": 3
     //            }
     //          ],
     //          "relationship": "111",
     //          "level": 2
     //        }
     //      ],
     //      "relationship": "001",
     //      "level": 1
     //    }

        show(dataForChart);


        // добавление классов для левой и правок колонки
        // const leftNodeEls = document.querySelectorAll('.top-moved');
        // for (let i = 0; i < leftNodeEls.length; i++) {
        //   const verticalLeftNodeEl = leftNodeEls[i].parentNode.parentNode.nextSibling;
        //   verticalLeftNodeEl.classList.add("left");
        // }
        //
        // const rightNodeEls = document.querySelectorAll('.top-hidden');
        // for (let i = 0; i < rightNodeEls.length; i++) {
        //   const verticalNodeRightEl = rightNodeEls[i].parentNode.parentNode.nextSibling;
        //   verticalNodeRightEl.classList.add("right");
        //
        //   const verticalNodeRightTableEl = rightNodeEls[i].parentNode.parentNode.parentNode;
        //   console.log(verticalNodeRightTableEl);
        //   verticalNodeRightTableEl.classList.add("move-left");
        // }


        // удаляется спиннер
        const loaderEl = document.querySelector('.js-loader');

        loaderEl.remove();


      });

})(jQuery);

// для удаления id данных с элементами

//     const formatChildren = (rows) =>
//       Object.entries(rows).map(([, value]) => {
//         if (value.children) {
//           return {
//             ...value,
//             children: value.children ? formatChildren(value.children) : []
//           }
//         } else {
//           return {
//             ...value
//           }
//         }
//       });





