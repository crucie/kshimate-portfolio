"use client"

import { useState } from "react"
import { Network, Router, Shield, Globe, Server, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NetworkPage() {
  const [activeProtocol, setActiveProtocol] = useState("tcp")

  const networkTechnologies = [
    {
      category: "ROUTING_PROTOCOLS.CFG",
      icon: Router,
      technologies: [
        { name: "OSPF", description: "Open Shortest Path First - Link-state routing", level: "Advanced" },
        { name: "BGP", description: "Border Gateway Protocol - Internet backbone", level: "Expert" },
        { name: "EIGRP", description: "Enhanced Interior Gateway Routing Protocol", level: "Advanced" },
        { name: "RIP", description: "Routing Information Protocol - Distance vector", level: "Intermediate" },
        { name: "IS-IS", description: "Intermediate System to Intermediate System", level: "Advanced" },
      ],
    },
    {
      category: "SWITCHING_TECH.JSON",
      icon: Network,
      technologies: [
        { name: "VLAN", description: "Virtual Local Area Network segmentation", level: "Intermediate" },
        { name: "STP", description: "Spanning Tree Protocol - Loop prevention", level: "Intermediate" },
        { name: "LACP", description: "Link Aggregation Control Protocol", level: "Advanced" },
        { name: "VTP", description: "VLAN Trunking Protocol", level: "Intermediate" },
        { name: "802.1Q", description: "VLAN Tagging standard", level: "Advanced" },
      ],
    },
    {
      category: "SECURITY_PROTOCOLS.EXE",
      icon: Shield,
      technologies: [
        { name: "IPSec", description: "Internet Protocol Security suite", level: "Advanced" },
        { name: "SSL/TLS", description: "Secure Sockets Layer / Transport Layer Security", level: "Advanced" },
        { name: "WPA3", description: "Wi-Fi Protected Access 3", level: "Intermediate" },
        { name: "802.1X", description: "Port-based Network Access Control", level: "Advanced" },
        { name: "RADIUS", description: "Remote Authentication Dial-In User Service", level: "Advanced" },
      ],
    },
    {
      category: "NETWORK_SERVICES.SH",
      icon: Server,
      technologies: [
        { name: "DNS", description: "Domain Name System resolution", level: "Intermediate" },
        { name: "DHCP", description: "Dynamic Host Configuration Protocol", level: "Intermediate" },
        { name: "NAT/PAT", description: "Network/Port Address Translation", level: "Intermediate" },
        { name: "QoS", description: "Quality of Service traffic management", level: "Advanced" },
        { name: "SNMP", description: "Simple Network Management Protocol", level: "Advanced" },
      ],
    },
  ]

  const protocolStack = {
    tcp: {
      name: "TCP/IP_STACK.PROTO",
      layers: [
        { layer: "APPLICATION", protocols: ["HTTP", "HTTPS", "FTP", "SSH", "SMTP"], color: "bg-red-400" },
        { layer: "TRANSPORT", protocols: ["TCP", "UDP"], color: "bg-orange-400" },
        { layer: "NETWORK", protocols: ["IP", "ICMP", "ARP"], color: "bg-yellow-400" },
        { layer: "DATA_LINK", protocols: ["ETHERNET", "PPP", "FRAME_RELAY"], color: "bg-green-400" },
        { layer: "PHYSICAL", protocols: ["FIBER", "COPPER", "WIRELESS"], color: "bg-blue-400" },
      ],
    },
    osi: {
      name: "OSI_MODEL.LAYER",
      layers: [
        { layer: "APPLICATION", protocols: ["HTTP", "FTP", "SMTP", "DNS"], color: "bg-red-400" },
        { layer: "PRESENTATION", protocols: ["SSL", "TLS", "JPEG", "MPEG"], color: "bg-pink-400" },
        { layer: "SESSION", protocols: ["NetBIOS", "RPC", "SQL"], color: "bg-purple-400" },
        { layer: "TRANSPORT", protocols: ["TCP", "UDP", "SPX"], color: "bg-orange-400" },
        { layer: "NETWORK", protocols: ["IP", "ICMP", "IPX"], color: "bg-yellow-400" },
        { layer: "DATA_LINK", protocols: ["ETHERNET", "PPP", "ATM"], color: "bg-green-400" },
        { layer: "PHYSICAL", protocols: ["FIBER", "COPPER", "RADIO"], color: "bg-blue-400" },
      ],
    },
  }

  const networkTopologies = [
    {
      name: "STAR_TOPOLOGY.NET",
      ascii: ["    ┌─[H]", "    │", "[H]─┼─[S]─┼─[H]", "    │", "    └─[H]"],
      description: "Central switch/hub configuration",
    },
    {
      name: "MESH_TOPOLOGY.NET",
      ascii: ["[R]───[R]", " │ \\ / │", " │  X  │", " │ / \\ │", "[R]───[R]"],
      description: "Full redundancy between nodes",
    },
    {
      name: "RING_TOPOLOGY.NET",
      ascii: ["  [R]─[R]", "  │   │", "[R]   [R]", "  │   │", "  [R]─[R]"],
      description: "Circular data flow pattern",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto slide-in">
      <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 text-center tracking-wider">🌐 NETWORK_MGMT.SYS</h2>

      {/* Protocol Stack Visualization */}
      <Card className="pixel-border bg-card text-card-foreground border-current component-grid dark:dark light animate mb-8">
        <CardHeader>
          <CardTitle className="font-mono text-xl flex items-center gap-2">
            <Globe className="h-5 w-5" />
            PROTOCOL_STACK.VIZ
          </CardTitle>
          <CardDescription className="font-mono">Network protocol layer visualization</CardDescription>
          <div className="flex gap-2 mt-4">
            <Button
              onClick={() => setActiveProtocol("tcp")}
              variant={activeProtocol === "tcp" ? "default" : "outline"}
              className="pixel-border font-mono border-current component-grid dark:dark light"
            >
              TCP/IP
            </Button>
            <Button
              onClick={() => setActiveProtocol("osi")}
              variant={activeProtocol === "osi" ? "default" : "outline"}
              className="pixel-border font-mono border-current component-grid dark:dark light"
            >
              OSI_MODEL
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="font-mono text-lg mb-4">
              {protocolStack[activeProtocol as keyof typeof protocolStack].name}
            </h3>
            {protocolStack[activeProtocol as keyof typeof protocolStack].layers.map((layer, index) => (
              <div
                key={index}
                className={`p-4 pixel-border transition-all duration-300 hover:scale-105 component-grid dark:dark light ${layer.color} text-gray-900`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-sm">
                    L{protocolStack[activeProtocol as keyof typeof protocolStack].layers.length - index}: {layer.layer}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {layer.protocols.map((protocol, pIndex) => (
                      <span
                        key={pIndex}
                        className="px-2 py-1 text-xs font-mono bg-black/20 pixel-border border-gray-900"
                      >
                        {protocol}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Network Technologies Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {networkTechnologies.map((category, categoryIndex) => (
          <Card
            key={categoryIndex}
            className="pixel-border bg-card text-card-foreground border-current component-grid dark:dark light animate"
            style={{ animationDelay: `${categoryIndex * 0.2}s` }}
          >
            <CardHeader>
              <CardTitle className="font-mono text-lg flex items-center gap-2">
                <category.icon className="h-5 w-5" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.technologies.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="p-3 pixel-border bg-accent/20 hover:bg-accent/40 transition-all duration-200 hover:scale-105 component-grid dark:dark light"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono font-bold text-sm">{tech.name}</span>
                      <span
                        className={`px-2 py-1 text-xs font-mono pixel-border ${
                          tech.level === "Expert"
                            ? "bg-red-400 text-gray-900 border-red-600"
                            : tech.level === "Advanced"
                              ? "bg-orange-400 text-gray-900 border-orange-600"
                              : "bg-green-400 text-gray-900 border-green-600"
                        }`}
                      >
                        {tech.level}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">{tech.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Network Topologies */}
      <Card className="pixel-border bg-card text-card-foreground border-current component-grid dark:dark light animate mb-8">
        <CardHeader>
          <CardTitle className="font-mono text-xl flex items-center gap-2">
            <Network className="h-5 w-5" />
            NETWORK_TOPOLOGIES.MAP
          </CardTitle>
          <CardDescription className="font-mono">Common network architecture patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {networkTopologies.map((topology, index) => (
              <div
                key={index}
                className="text-center p-4 pixel-border bg-accent/20 hover:bg-accent/40 transition-all duration-300 hover:scale-105 component-grid dark:dark light"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <h4 className="font-mono font-bold text-sm mb-3">{topology.name}</h4>
                <div className="ascii-art font-mono text-xs mb-3 leading-tight">
                  {topology.ascii.map((line, lineIndex) => (
                    <div key={lineIndex}>{line}</div>
                  ))}
                </div>
                <p className="font-mono text-xs text-muted-foreground">{topology.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Network Commands Terminal */}
      <Card className="pixel-border bg-card text-card-foreground border-current component-grid dark:dark light animate">
        <CardHeader>
          <CardTitle className="font-mono text-xl flex items-center gap-2">
            <Zap className="h-5 w-5" />
            NETWORK_COMMANDS.SH
          </CardTitle>
          <CardDescription className="font-mono">Essential networking commands and tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-mono font-bold text-sm mb-3">DIAGNOSTIC_TOOLS.EXE</h4>
              {[
                { cmd: "ping", desc: "Test network connectivity" },
                { cmd: "traceroute", desc: "Trace packet path" },
                { cmd: "nslookup", desc: "DNS lookup utility" },
                { cmd: "netstat", desc: "Network statistics" },
                { cmd: "arp", desc: "Address Resolution Protocol" },
              ].map((tool, index) => (
                <div
                  key={index}
                  className="p-2 pixel-border bg-accent/10 font-mono text-xs hover:bg-accent/20 transition-colors component-grid dark:dark light"
                >
                  <span className="text-green-400 font-bold">{tool.cmd}</span>
                  <span className="text-muted-foreground ml-2">- {tool.desc}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="font-mono font-bold text-sm mb-3">CONFIG_COMMANDS.CFG</h4>
              {[
                { cmd: "ip route", desc: "Configure routing table" },
                { cmd: "vlan database", desc: "VLAN configuration" },
                { cmd: "interface", desc: "Interface configuration" },
                { cmd: "access-list", desc: "Access control lists" },
                { cmd: "spanning-tree", desc: "STP configuration" },
              ].map((cmd, index) => (
                <div
                  key={index}
                  className="p-2 pixel-border bg-accent/10 font-mono text-xs hover:bg-accent/20 transition-colors component-grid dark:dark light"
                >
                  <span className="text-blue-400 font-bold">{cmd.cmd}</span>
                  <span className="text-muted-foreground ml-2">- {cmd.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
