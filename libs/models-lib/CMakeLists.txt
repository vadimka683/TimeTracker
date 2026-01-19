# Библиотека моделей данных Qt
add_library(TimeTracker-models STATIC)

# Публичные заголовки
target_include_directories(TimeTracker-models
    PUBLIC
    $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
    $<INSTALL_INTERFACE:include>
)

# Исходные файлы
target_sources(TimeTracker-models
    PRIVATE
    #src/TimeLogTableModel.cpp
    #src/ProjectListModel.cpp
   # src/EmployeeListModel.cpp
)

# Публичные заголовки (для MOC)
target_sources(TimeTracker-models
    PUBLIC
    FILE_SET HEADERS
    BASE_DIRS ${CMAKE_CURRENT_SOURCE_DIR}/include
    FILES
    #include/TimeTracker/models/TimeLogTableModel.hpp
    #include/TimeTracker/models/ProjectListModel.hpp
    #include/TimeTracker/models/EmployeeListModel.hpp
)

# Зависимости: нужен core-lib для доступа к сущностям
target_link_libraries(TimeTracker-models
    PUBLIC
    TimeTracker-core      # Для TimeEntry, Project и других сущностей
    Qt5::Core
    Qt5::Gui
)

# Настройки компиляции
target_compile_features(TimeTracker-models PUBLIC cxx_std_17)

# Свойства
set_target_properties(TimeTracker-models PROPERTIES
    VERSION ${PROJECT_VERSION}
    SOVERSION 1
)