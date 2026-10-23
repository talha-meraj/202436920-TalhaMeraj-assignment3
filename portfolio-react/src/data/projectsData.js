/* Portfolio projects dataset
Each project object includes:
- id: Unique identifier used for React keys and DOM anchors
- title, desc: Used for card display and search filtering
- category, categoryLabel: Categorization (hardware/software)
- date: Formatted date string (e.g. 'OCT 2026') used for display and sorting
- featured: Numeric priority score (higher score = higher priority in featured sort)
- theme: CSS class defining the spine and cover color gradient
- image, imageAlt: Image path and accessible description
- chips, tags: Technology pills shown on the book cover and modal details
- repoUrl: Link to source code repository */

export const PROJECTS_DATA = [
    {
        id: "16-bit-pipelined-processor",
        title: "16-Bit Pipelined CPU Implementation",
        category: "hardware",
        categoryLabel: "Hardware / Computer Architecture",
        date: "DEC 2024",
        featured: 98,
        theme: "theme-sapphire",
        image: "/assets/images/16-bit-pipelined-processor.png",
        imageAlt: "16-Bit Pipelined CPU Datapath Diagram",
        desc: "Custom 16-bit MIPS-like pipelined processor designed and verified in Logisim Evolution. Features a 5-stage pipeline (IF, ID, EX, MEM, WB), hardware-level hazard resolution (data forwarding and pipeline stalling), a 16-bit ALU supporting 12 operations, a barrel shifter, and support for R, I, and J instruction formats.",
        chips: ["Logisim", "MIPS ISA", "5-Stage Pipeline"],
        tags: ["Logisim Evolution", "Computer Architecture", "MIPS ISA", "5-Stage Pipeline"],
        repoUrl: "https://github.com/merajtalha/16-bit-pipelined-processor"
    },
    {
        id: "portfolio-website",
        title: "Personal Portfolio Website",
        category: "software",
        categoryLabel: "Software / Web",
        date: "OCT 2026",
        featured: 92,
        theme: "theme-navy",
        image: "/assets/images/kfupm-bg.png",
        imageAlt: "Personal Portfolio Web Application",
        desc: "Modern responsive portfolio single-page application built with React 19 and Vite. Features dynamic category filtering, real-time multi-field search, controlled form validation, persistent dark/light theme switching, and adaptive daytime/nighttime campus backgrounds.",
        chips: ["React 19", "Vite", "JavaScript", "CSS", "HTML"],
        tags: ["React 19", "Vite", "JavaScript", "CSS Tokens", "SPA"],
        repoUrl: "https://github.com/merajtalha"
    },
    {
        id: "pedestrian-crossing-system",
        title: "FPGA Smart Pedestrian Crossing System",
        category: "hardware",
        categoryLabel: "Digital Logic / FPGA Design",
        date: "MAY 2025",
        featured: 88,
        theme: "theme-emerald",
        image: "/assets/images/artix7-fpga.png",
        imageAlt: "Digilent Nexys A7 FPGA Board (Xilinx Artix-7)",
        desc: "Complete digital hardware system modeling and implementing a three-road smart traffic light controller with prioritized pedestrian crossing signals, configured for the Nexys-A7-100T FPGA board (Xilinx Artix-7). Features a modular FSM control path, 1Hz countdown timers, hardware debouncers, and a multiplexed 7-segment display.",
        chips: ["Verilog HDL", "Nexys A7", "FSM"],
        tags: ["Verilog HDL", "Nexys-A7 FPGA", "Xilinx Vivado", "FSM", "Digital Systems"],
        repoUrl: "https://github.com/merajtalha/pedestrian-crossing-system"
    },
    {
        id: "bfloat16-cephes-exponentiation",
        title: "bfloat16 Exponentiation (e^x)",
        category: "hardware",
        categoryLabel: "Computer Systems / Low-Level Math",
        date: "JUN 2026",
        featured: 82,
        theme: "theme-terracotta",
        image: "/assets/images/bfloat16-diagram.png",
        imageAlt: "Brain Floating Point bfloat16 Bit Layout",
        desc: "Calculates the natural exponential function (e^x) for a 16-bit Brain Floating Point (bfloat16) number using MIPS Assembly. Implements the polynomial Cephes algorithm, ASCII-to-float conversion, and handles edge cases including NaN, positive/negative infinities, zero, and boundary out-of-bounds checks.",
        chips: ["MIPS Assembly", "bfloat16", "Cephes"],
        tags: ["MIPS Assembly", "bfloat16", "Cephes Algorithm", "Floating-Point"],
        repoUrl: "https://github.com/merajtalha/bfloat16-cephes-exponentiation"
    },
    {
        id: "mips-assembly-programs",
        title: "MIPS Assembly Programs & Algorithms",
        category: "hardware",
        categoryLabel: "Low-Level Computing / Assembly",
        date: "JUN 2026",
        featured: 78,
        theme: "theme-indigo",
        image: "/assets/images/mips-die.png",
        imageAlt: "MIPS Microprocessor Silicon Die Layout",
        desc: "Collection of assembly language programs written in MIPS covering numerical methods and algorithms: interactive binary-search number guessing game with lying detection, 64-bit double-precision quadratic solver with complex root support, Newton's square root approximation, and Taylor series sine approximation.",
        chips: ["MIPS Assembly", "MARS", "Algorithms"],
        tags: ["MIPS Assembly", "MARS Simulator", "Numerical Methods", "Binary Search"],
        repoUrl: "https://github.com/merajtalha/mips-assembly-programs"
    },
    {
        id: "file-system-simulator",
        title: "Terminal-Based File System Simulator",
        category: "software",
        categoryLabel: "Systems Software / Data Structures",
        date: "MAY 2025",
        featured: 72,
        theme: "theme-terracotta",
        image: "/assets/images/file-system-tree.png",
        imageAlt: "Hierarchical File System Directory Tree",
        desc: "A Java command-line simulation of a Unix-like in-memory file system. Implements an N-ary hierarchical directory tree, a custom separate-chaining Hash Table with singly linked lists for O(1) file lookups, recursive DFS traversals (tree, du, rm -r), and the Knuth-Morris-Pratt (KMP) string pattern search algorithm for grep operations.",
        chips: ["Java", "Trees", "Hash Table"],
        tags: ["Java", "Data Structures", "N-ary Tree", "Custom Hash Table", "KMP Algorithm"],
        repoUrl: "https://github.com/merajtalha/file-system-simulator"
    },
    {
        id: "connect-4-game",
        title: "CLI Connect 4 Game in Python",
        category: "software",
        categoryLabel: "Software & Algorithms / Python",
        date: "OCT 2024",
        featured: 65,
        theme: "theme-crimson",
        image: "/assets/images/connect4.png",
        imageAlt: "Connect 4 Command-Line Game Interface",
        desc: "Terminal-based Python implementation of Connect 4 featuring frame-by-frame falling piece terminal animations, customizable player pieces, multi-directional 4-in-a-row win detection (horizontal, vertical, diagonal), and persistent leaderboard file I/O tracking high scores across game sessions.",
        chips: ["Python", "Algorithms", "OOP"],
        tags: ["Python", "Algorithms", "Game Logic", "OOP"],
        repoUrl: "https://github.com/merajtalha/connect-4-game"
    }
];
