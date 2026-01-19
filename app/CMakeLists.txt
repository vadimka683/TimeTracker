# Используем UI файлы
qt5_wrap_ui(UI_HEADERS ui/MainWindow.ui)

# Создаем приложение
add_executable(TimeTracker-app src/main.cpp ${UI_HEADERS})

# Подключаем ресурсы
qt5_add_resources(RESOURCES ../resources/icons.qrc)
target_sources(TimeTracker-app PRIVATE ${RESOURCES})

# Зависимости: подключаем ВСЕ библиотеки
target_link_libraries(TimeTracker-app
    PRIVATE
    TimeTracker-ui       # UI зависит от core, так что core тоже подтянется
    TimeTracker-models
    Qt5::Widgets
    Qt5::Sql
)

# Пути к заголовкам
target_include_directories(TimeTracker-app
    PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}
)

# Свойства приложения
set_target_properties(TimeTracker-app PROPERTIES
    OUTPUT_NAME "TimeTracker"
    WIN32_EXECUTABLE TRUE
)

# Установка
install(TARGETS TimeTracker-app
    RUNTIME DESTINATION bin
    BUNDLE DESTINATION .
)