import cx_Freeze

executables = [cx_Freeze.Executable("Spaceship.py")]

cx_Freeze.setup(
    name = "Spaceship",
    options = {"build_exe":{"packages":["pygame"], "include_files": ["Spaceship_res"]}},
    executables = executables

    )