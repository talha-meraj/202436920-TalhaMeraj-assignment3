/* Project Data Source
   Defines the central schema for all featured and categorized projects:
   - id: Unique URL-safe identifier
   - title, desc: Used for card display and search filtering
   - category, categoryLabel: Categorization (hardware/software)
   - date: Formatted date string (e.g. 'OCT 2026') used for display and sorting
   - isoDate: Standard ISO 8601 date string (YYYY-MM-DD) for reliable cross-browser chronological sorting
   - featured: Numeric priority score (higher score = higher priority in featured sort)
   - theme: CSS class defining the spine and cover color gradient
   - image, imageAlt: Image path and accessible description
   - tags: Array of badges displayed on the project card
   - repoUrl: Optional GitHub link for repository statistics and external linking
*/

export const PROJECTS_DATA = [
    {
        id: "16-bit-pipelined-processor",
        title: "16-Bit Pipelined Processor",
        desc: "Five-stage pipelined processor in Verilog with hazard detection, data forwarding, branch prediction, and memory-mapped I/O peripherals. Verified using automated ModelSim testbenches against 1,000+ randomized assembly instructions.",
        category: "hardware",
        categoryLabel: "Hardware / Computer Architecture",
        date: "DEC 2024",
        isoDate: "2024-12-01",
        featured: 98,
        theme: "theme-sapphire",
        image: "/assets/images/16-bit-pipelined-processor.webp",
        imageAlt: "Detailed architectural schematic of a 5-stage 16-bit pipelined CPU",
        tags: ["Verilog", "ModelSim", "Computer Architecture", "Pipelining"],
        repoUrl: "https://github.com/merajtalha/16-bit-pipelined-processor",
        chips: ["Verilog"]
    },
    {
        id: "portfolio-website",
        title: "Personal Portfolio Website",
        desc: "Academic and professional portfolio built with React 19 and Vite featuring dark/light theme persistence, interactive 3D book components, live GitHub REST API integration, and real-time validated forms.",
        category: "software",
        categoryLabel: "Software / Web",
        date: "OCT 2026",
        isoDate: "2026-10-01",
        featured: 92,
        theme: "theme-navy",
        image: "/assets/images/kfupm-bg.webp",
        imageAlt: "Clean, responsive user interface of the developer portfolio web application",
        tags: ["React 19", "Vite", "CSS Modules", "Responsive Design"],
        repoUrl: "https://github.com/merajtalha/portfolio-website",
        chips: ["React"]
    },
    {
        id: "fpga-accelerator-bfloat16",
        title: "FPGA Matrix Multiplier for ML",
        desc: "Hardware-accelerated systolic array matrix multiplication engine implemented on a Xilinx Artix-7 FPGA, optimized for edge-computing and low-power tensor arithmetic inference.",
        category: "hardware",
        categoryLabel: "Digital Logic / FPGA Design",
        date: "MAY 2025",
        isoDate: "2025-05-01",
        featured: 88,
        theme: "theme-emerald",
        image: "/assets/images/artix7-fpga.webp",
        imageAlt: "Block diagram of an 8x8 systolic array matrix multiplication engine on FPGA",
        tags: ["SystemVerilog", "FPGA", "Vivado", "Hardware Acceleration"],
        repoUrl: "https://github.com/merajtalha/fpga-accelerator-bfloat16",
        chips: ["SystemVerilog"]
    },
    {
        id: "bfloat16-floating-point-alu",
        title: "Bfloat16 Floating-Point ALU",
        desc: "Pipelined 16-bit Brain Floating Point Arithmetic Logic Unit in SystemVerilog, supporting addition, subtraction, multiplication, and fused multiply-add (FMA) with IEEE 754-compatible exception handling.",
        category: "hardware",
        categoryLabel: "Computer Systems / Low-Level Math",
        date: "JUN 2026",
        isoDate: "2026-06-01",
        featured: 82,
        theme: "theme-terracotta",
        image: "/assets/images/bfloat16-diagram.webp",
        imageAlt: "Detailed circuit diagram of a bfloat16 floating-point arithmetic logic unit",
        tags: ["SystemVerilog", "Arithmetic Logic", "Digital Design", "Verification"],
        repoUrl: "https://github.com/merajtalha/bfloat16-floating-point-alu",
        chips: ["SystemVerilog"]
    },
    {
        id: "mips-assembly-numerical-algorithms",
        title: "MIPS Assembly Programs & Algorithms",
        desc: "Collection of assembly language programs written in MIPS covering numerical methods and algorithms: interactive binary-search number guessing game with lying detection, 64-bit double-precision quadratic solver with complex root support, Newton's square root approximation, and Taylor series sine approximation.",
        category: "hardware",
        categoryLabel: "Low-Level Computing / Assembly",
        date: "JUN 2026",
        isoDate: "2026-06-01",
        featured: 78,
        theme: "theme-indigo",
        image: "/assets/images/mips-die.webp",
        imageAlt: "Silicon die photo of a MIPS microprocessor with highlighted execution units",
        tags: ["MIPS Assembly", "MARS Simulator", "Numerical Methods", "Binary Search"],
        repoUrl: "https://github.com/merajtalha/mips-assembly-numerical-algorithms",
        chips: ["Assembly"]
    },
    {
        id: "custom-unix-file-system",
        title: "Hierarchical File System in Java",
        desc: "Hierarchical in-memory virtual file system simulating Unix-style directory trees with absolute/relative path resolution, file permissions, and directory traversal algorithms.",
        category: "software",
        categoryLabel: "Systems Software / Data Structures",
        date: "MAY 2025",
        isoDate: "2025-05-01",
        featured: 72,
        theme: "theme-terracotta",
        image: "/assets/images/file-system-tree.webp",
        imageAlt: "UML class and object diagram showing composite-pattern tree data structures",
        tags: ["Java", "Data Structures", "Algorithms", "Composite Pattern"],
        repoUrl: "https://github.com/merajtalha/custom-unix-file-system",
        chips: ["Java"]
    },
    {
        id: "connect-4-game",
        title: "Connect Four in Python",
        desc: "Interactive two-player Connect Four implementation in Python with ASCII board rendering, turn-based input validation, horizontal, vertical, and diagonal win condition detection, and game state management.",
        category: "software",
        categoryLabel: "Software & Algorithms / Python",
        date: "OCT 2024",
        isoDate: "2024-10-01",
        featured: 65,
        theme: "theme-crimson",
        image: "/assets/images/connect4.webp",
        imageAlt: "Connect Four game board with red and yellow tokens in a winning diagonal pattern",
        tags: ["Python", "Algorithms", "Game Logic", "OOP"],
        repoUrl: "https://github.com/merajtalha/connect-4-game",
        chips: ["Python"]
    }
];