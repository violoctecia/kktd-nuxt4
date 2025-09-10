<template>
  <div class="flex flex-col min-h-screen">
    <SiteHeader />

    <main class="flex-1 pt-24 container mx-auto px-4 space-y-10">
      <section>
        <h2 class="text-3xl font-bold text-primary-dark mb-6">
          Информация для абитуриентов
        </h2>

        <div class="space-y-8">
          <section id="document-submission" class="space-y-6">
            <h3 class="text-2xl font-semibold">Прием документов</h3>

            <div class="space-y-4">
              <div>
                <h4 class="font-semibold">Сроки приема документов</h4>
                <p>
                  С 20 июня 2025 года по 15 августа 2025 года, включительно. Для
                  специальностей, по которым проводятся творческие испытания
                  (например, 29.02.10), до 10 августа 2025 года. Возможно
                  продление до 1 декабря 2025 года для некоторых специальностей,
                  если остаются свободные места.
                </p>
              </div>

              <div>
                <h4 class="font-semibold">Способ подачи документов</h4>
                <ul class="list-disc pl-6 space-y-1">
                  <li>Лично в колледже</li>
                  <li>
                    Почтой заказным письмом с уведомлением о вручении
                  </li>
                  <li>Через порталы государственных услуг</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold">Документы для подачи заявления</h4>
                <ul class="list-disc pl-6 space-y-1">
                  <li>
                    Копия документов, удостоверяющих личность и гражданство
                  </li>
                  <li>
                    Оригинал или копия документа об образовании и/или
                    квалификации
                  </li>
                  <li>4 фотографии (3х4)</li>
                  <li>Заполненная анкета</li>
                  <li>Копия СНИЛС (при наличии)</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold">Документы для зачисления</h4>
                <ul class="list-disc pl-6 space-y-1">
                  <li>Медицинская справка формы 086-у</li>
                  <li>Вакцинационная карта/свидетельство</li>
                  <li>Флюорография</li>
                  <li>Копия СНИЛС (при наличии)</li>
                  <li>Копия ИНН (при наличии)</li>
                  <li>Копия полиса ОМС (при наличии)</li>
                  <li>Копия повестки из военкомата или военного билета</li>
                  <li>Медицинская карта из школы</li>
                  <li>
                    Документы для получения социальных льгот
                  </li>
                  <li>
                    Документы для получения приоритетного права на зачисление
                  </li>
                  <li>Оригинал или копия справки из школы</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold">
                  Особенности приема иностранных граждан
                </h4>
                <p>
                  При подаче заявления иностранные граждане предоставляют:
                </p>
                <ul class="list-disc pl-6 space-y-1">
                  <li>
                    Копию документа, удостоверяющего личность
                  </li>
                  <li>
                    Документ об образовании или его заверенную копию
                  </li>
                  <li>
                    Заверенный перевод документа на русский язык
                  </li>
                  <li>
                    Доказательства принадлежности к соотечественникам
                  </li>
                  <li>6 фотографий (3х4)</li>
                </ul>
                <p>
                  Все переводы должны быть выполнены на имя и фамилию,
                  указанные в документе.
                </p>
              </div>
            </div>
          </section>

          <section id="admission-plan" class="space-y-6">
            <h3 class="text-2xl font-semibold">План приема</h3>
            <div class="overflow-x-auto">
              <table class="w-full border border-gray-300 text-sm">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="border px-3 py-2 text-left">
                      Источник финансирования
                    </th>
                    <th class="border px-3 py-2 text-left">
                      Специальность/профессия
                    </th>
                    <th class="border px-3 py-2 text-left">Квалификация</th>
                    <th class="border px-3 py-2 text-left">База</th>
                    <th class="border px-3 py-2 text-left">Форма</th>
                    <th class="border px-3 py-2 text-left">Мест</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- строки таблицы сюда -->
                </tbody>
              </table>
            </div>
            <div class="space-y-1">
              <p><strong>Итого бюджет:</strong> 290 мест</p>
              <p><strong>Итого не бюджет:</strong> 125 мест</p>
            </div>
          </section>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
</script>
