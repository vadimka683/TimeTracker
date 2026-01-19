# UI библиотека зависит от core-lib
add_library(TimeTracker-ui STATIC)

target_include_directories(TimeTracker-ui
    PUBLIC
    $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
    $<INSTALL_INTERFACE:include>
)

target_sources(TimeTracker-ui
    PRIVATE
   # src/MainWindow.cpp
    #src/dialogs/TimeLogDialog.cpp
)

target_sources(TimeTracker-ui
    PUBLIC
    FILE_SET HEADERS
    BASE_DIRS ${CMAKE_CURRENT_SOURCE_DIR}/include
    FILES
    #include/TimeTracker/ui/MainWindow.hpp
    #include/TimeTracker/ui/dialogs/TimeLogDialog.hpp
)

target_link_libraries(TimeTracker-ui
    PUBLIC
    TimeTracker-core      # «ависит от €дра
    Qt5::Widgets
    Qt5::Gui
)

target_compile_features(TimeTracker-ui PUBLIC cxx_std_17)